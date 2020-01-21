import { Module } from '@nestjs/common';
import { EwelinkService } from './ewelink.service';
import { EwelinkController } from './ewelink.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    ConfigModule,
  ],
  providers: [EwelinkService],
  controllers: [EwelinkController]
})
export class EwelinkModule {}
