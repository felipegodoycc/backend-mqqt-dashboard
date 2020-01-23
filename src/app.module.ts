import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MedicionModule } from './medicion/medicion.module';
import { EwelinkModule } from './ewelink/ewelink.module';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MedicionModule,
    EwelinkModule,
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport:{ host: 'smtp-pulse.com', port: 2525,
                    auth: { user: 'pipexth@gmail.com', pass: 'fXNkYmmoF4f3at'} },
        defaults: {
          from: 'soporte@ifcomputing.com',
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
