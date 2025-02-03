import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NumberController } from './number/number.controller';
import { NumberService } from './number/number.service';

@Module({
  imports: [],
  controllers: [AppController, NumberController],
  providers: [AppService, NumberService],
})
export class AppModule {}
