import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NumberService {
  async getNumberDetails(number: number) {
    const isPrime = this.checkPrime(number);
    const isPerfect = this.checkPerfect(number);
    const isArmstrong = this.checkArmstrong(number);
    const digitSum = this.getDigitSum(number);
    const parity = number % 2 === 0 ? 'even' : 'odd';

    const properties = [];
    if (isArmstrong) properties.push('armstrong');
    properties.push(parity);

    const funFact = await this.getFunFact(number);

    return {
      number,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    };
  }
  private checkPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  private checkPerfect(num: number): boolean {
    let sum = 0;
    for (let i = 1; i < num; i++) {
      if (num % i === 0) sum += i;
    }
    return sum === num;
  }

  private checkArmstrong(num: number): boolean {
    const digits = num.toString().split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
  }

  private getDigitSum(num: number): number {
    return num
      .toString()
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  private async getFunFact(num: number): Promise<string> {
    try {
      const response = await axios.get(`http://numbersapi.com/${num}/math`);
      return response.data;
    } catch {
      return 'Fun fact at this moment';
    }
  }
}
