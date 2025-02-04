import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NumberService {
  async getNumberDetails(numberString?: string) {
    if (!numberString) {
      throw new BadRequestException({
        detail: [
          {
            type: 'missing',
            loc: ['query', 'number'],
            msg: 'Field required',
            input: null,
          },
        ],
      });
    }

    if (!/^-?\d+$/.test(numberString)) {
      throw new BadRequestException({
        number: numberString,
        error: true,
      });
    }

    const number = parseInt(numberString, 10);

    const isPrime = this.checkIfPrime(number);
    const digitSum = this.getDigitSum(number);
    const parity = number % 2 === 0 ? 'even' : 'odd';
    const isPerfect = this.checkIfPerfect(number);
    const isArmstrong = number >= 0 && this.checkTheArmstrong(number); // Armstrong check only for non-negative

    const properties = [];
    if (isArmstrong) properties.push('armstrong');
    properties.push(parity);

    const funFact = await this.getTheFunFact(number);

    return {
      number,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    };
  }

  private checkIfPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  private checkIfPerfect(num: number): boolean {
    let sum = 0;
    for (let i = 1; i < num; i++) {
      if (num % i === 0) sum += i;
    }
    return sum === num;
  }

  private checkTheArmstrong(num: number): boolean {
    const digits = num.toString().split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
  }

  private getDigitSum(num: number): number {
    return (
      num
        .toString()
        .split('')
        .filter((char) => char !== '-')
        .map(Number)
        .reduce((a, b) => a + b, 0) * (num < 0 ? -1 : 1)
    );
  }

  private async getTheFunFact(num: number): Promise<string> {
    try {
      const response = await axios.get(`http://numbersapi.com/${num}/math`);
      return response.data;
    } catch {
      return 'Fun fact at this moment';
    }
  }
}
