import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './user.providers';


@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt', session: false}),
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService, ...usersProviders],
    exports: [UserService]
})
export class UserModule {}
