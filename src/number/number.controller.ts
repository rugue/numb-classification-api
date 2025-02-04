import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { NumberService } from './number.service';

@Controller('api')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') numberString?: string) {
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
    const number = parseInt(numberString, 10);
    if (isNaN(number)) {
      throw new BadRequestException({
        number: numberString,
        error: true,
      });
    }
    return await this.numberService.getNumberDetails(number);
  }
}
