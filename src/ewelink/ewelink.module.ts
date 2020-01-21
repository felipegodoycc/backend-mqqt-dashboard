import { Module } from '@nestjs/common';
import { EwelinkService } from './ewelink.service';
import { EwelinkController } from './ewelink.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false})
  ],
  providers: [EwelinkService],
  controllers: [EwelinkController]
})
export class EwelinkModule {}
