import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicionModule } from './medicion/medicion.module';
import { EwelinkModule } from './ewelink/ewelink.module';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MedicionModule,
    EwelinkModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_URL'),
          secure: true,
          port: config.get('SMTP_PORT'),
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: '"Soporte" <soporte@ifcomputing.com>',
        },
        template: {
          dir: __dirname + '../../templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
