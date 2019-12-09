import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicionModule } from './medicion/medicion.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MedicionModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
