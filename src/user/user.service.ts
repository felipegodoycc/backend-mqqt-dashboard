import { Injectable, NotFoundException, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResetPasswordDTO } from './dto/reset-password-get.dto';
import { NewPasswordDTO } from './dto/new-password.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import * as _ from 'lodash';
import { ObjectID } from 'bson';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL') private readonly userModel,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    ) {}

    async getAllUser(options: Object) {
        const all = await this.userModel.findAndFilter({}, options, [{ path: 'profiles.project'}, { path: 'profiles.areas.area' }]);
        let total = await this.userModel.findAndFilter({}, options, [], false);
        total = total.length;
        return { all, total };
    }

    async getUser(userID: any): Promise<User> {
        const user = await this.userModel.findById(userID)
                                    .populate({path: 'profiles.project'})
                                    .populate({path: 'profiles.areas.area'})
                                    .exec();
        if (!user) { throw new NotFoundException('Usuario no encontrado'); }

        return user;
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        if (newUser.password === '' || !newUser.password ) {
            console.log('Creando con clave default');
            newUser.password = newUser.username;
            newUser.reset_password = true;
            newUser.reset_token = this.authService.createJwtPayload(newUser).token;
        }
        await newUser.save();
        return newUser;
    }

    async updateUser(userID: any, createUserDTO: CreateUserDTO): Promise<User> {
        const updateUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDTO, { new: true, context: 'query' });
        if (!updateUser) { throw new NotFoundException('Usuario no encontrado'); }

        return updateUser;
    }

    async deleteUser(userID: any): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndUpdate(userID, { active: false}, {new: true});
        if (!deletedUser) { throw new NotFoundException('Usuario no encontrado'); }
        return deletedUser;
    }

    async activeUser(userID: any): Promise<User> {
        const activeUser = await this.userModel.findByIdAndUpdate(userID, { active: true }, { new: true });
        if (!activeUser) { throw new NotFoundException('Usuario no encontrado'); }
        return activeUser;
    }

    async findByUsername(username: string): Promise<any> {
        const user = await this.userModel.findOne({ username })
            .populate('profiles.project', '-cliente.mod_contratados')
            .populate('id_cliente', 'nombre')
            .populate('id_empresa')
            .exec();

        if (!user) { throw new NotFoundException('Usuario no encontrado'); }
        return user;
    }

    async findByUsernameAndUpdate(username: any, createUserDTO: ResetPasswordDTO): Promise<User> {
        const user = await this.userModel.findOneAndUpdate({ username }, createUserDTO, { new: true}).exec();
        if (!user) { throw new NotFoundException('Usuario no encontrado'); }
        return user;
    }

    async findByResetTokenAndUpdate(newPasswordDTO: NewPasswordDTO): Promise<User> {
        const reset_token = newPasswordDTO.reset_token;
        console.log('[USUARIOS] reset_token', reset_token);
        const data = {
            reset_password: false,
            reset_token: '',
            password: bcrypt.hashSync(newPasswordDTO.new_password, 10)
        };
        const user = await this.userModel.findOneAndUpdate({ reset_token }, data, { new: true}).exec();
        console.log('[USUARIOS] user', user);
        if (!user) { throw new NotFoundException('Token no existe'); }
        return user;
    }
}
