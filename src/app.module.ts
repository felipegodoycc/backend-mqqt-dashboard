import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicionModule } from './medicion/medicion.module';
import { EwelinkModule } from './ewelink/ewelink.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MedicionModule,
    EwelinkModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
