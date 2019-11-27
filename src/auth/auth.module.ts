import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from './auth.providers';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(config: ConfigService) => ({
        secret: config.get('SECRET_KEY_JWT'),
        signOptions:{
          expiresIn: '1d'
        }
      }),
      inject: [ConfigService]      
    }),
    forwardRef(() =>UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...authProviders],
  exports: [PassportModule ,AuthService]
})
export class AuthModule {}
