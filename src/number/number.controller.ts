import { Controller, Get, Query } from '@nestjs/common';
import { NumberService } from './number.service';

@Controller('api')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') numberString?: string) {
    return await this.numberService.getNumberDetails(numberString);
  }
}
