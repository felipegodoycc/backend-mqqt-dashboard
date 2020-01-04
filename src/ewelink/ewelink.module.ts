import { Module } from '@nestjs/common';
import { EwelinkService } from './ewelink.service';
import { EwelinkController } from './ewelink.controller';

@Module({
  providers: [EwelinkService],
  controllers: [EwelinkController]
})
export class EwelinkModule {}
