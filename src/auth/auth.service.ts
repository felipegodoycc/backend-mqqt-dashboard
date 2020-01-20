import { Injectable, NotFoundException, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/payload.interface';
import { LoginDTO } from './dto/login.dto';
import { NewPasswordDTO } from './dto/new-password.dto';
import { Model } from 'mongoose';
import { AuthToken } from './interfaces/token.interface'
import { User } from '../user/interfaces/user.interface';
import SimpleCrypto from "simple-crypto-js";

@Injectable()
export class AuthService {
    private readonly simpleCrypto: any;

    constructor( 
        @Inject('AUTH_MODEL') private readonly authTokenModel: Model<AuthToken>,
        @Inject(forwardRef(() => UserService)) private userService: UserService, 
        private jwtService: JwtService,
    ){
        this.simpleCrypto = new SimpleCrypto('llave-ultra-secreta')
    }    

    async login(loginAttempt: LoginDTO){
        return this.validateUserByPassword(loginAttempt)
                .then( data => {
                    return this.validateResetPassword(data);
                })
    }

    async validateUserByPassword(loginAttempt: LoginDTO) {

        // This will be used for the initial login
        let userToAttempt = await this.userService.findByUsername(loginAttempt.username);
        const user = await this.userService.getUser(userToAttempt._id);
        
        return new Promise(async (resolve, reject) => {
            let loginPassword = loginAttempt.password;
            if(user.checkPassword(loginPassword))
             {
                const {token} =this.createJwtPayload(userToAttempt);
                if(await this.authTokenModel.findOneAndDelete({ user: userToAttempt._id }).exec()) console.log(`${userToAttempt.username} ya tiene token`)
                await new this.authTokenModel({ token, user: userToAttempt._id }).save()
                return resolve({ ok:true, user: userToAttempt, token });    
            }
            return reject('Usuario o clave incorrecta')
        });

    }

    validateResetPassword(data: any) {
        return new Promise((resolve) => {
            if(data.user.reset_password) return resolve({ reset_password: true, token: data.user.reset_token })
            resolve(data)
        })
        
    }

    validateToken(token){
        return new Promise((resolve,reject) => {
            const auth_token = this.authTokenModel.findOne({token});
            if(!auth_token){
                return reject('Unauthorized token');
            }
            return resolve(auth_token);
        })        
    }

    async validateUser(payload: JwtPayload): Promise<any> { 
        return new Promise(async (resolve, reject) => {
            // console.log(payload)
            let user = await this.userService.getUser(payload.user_id); 
            if(user){
                return resolve(payload);
            } else {
                return reject('Usuario no existe');
            }
        })      
    }

    createJwtPayload(user){
        let data: JwtPayload = {
            user_id: user._id,
            username: user.username      
        };

        let jwt = this.jwtService.sign(data);
        return {
            expiresIn: '1d',
            token: jwt            
        }

    }

    async resetPassword(username): Promise<User> {
        let data: JwtPayload = {
            username
        }
        const token = this.jwtService.sign(data)
        console.log('[AUTH] ',token)
        return await this.userService.findByUsernameAndUpdate(username,{ reset_password: true, reset_token: token});
        
    }

    async newPassword(reset_token, data: NewPasswordDTO): Promise<User>{
        const new_password = this.simpleCrypto.decrypt(data.password).toString();
        //console.log('[AUTH] Clave desencriptada', new_password)
        console.log('[AUTH] ',this.jwtService.verify(reset_token).exp);        
        return await this.userService.findByResetTokenAndUpdate({ new_password ,reset_token})        
    }

    async logout(token) {
        const user = await this.authTokenModel.findOneAndDelete({ token });
        if(!user) throw new NotFoundException('Usuario no encontrado')
        return user;

    }
}
