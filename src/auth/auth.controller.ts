import { Controller, Body, Post, Get, Param, Res, HttpStatus, Headers } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { NewPasswordDTO } from './dto/new-password.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('login') 
    async login(@Res() res: Response, @Body() loginUserDto: LoginDTO){
        this.authService.login(loginUserDto)
        .then( data => {
            res.status(HttpStatus.OK).json(data)
        })
        .catch( err => {
            console.log(err)
            res.status(HttpStatus.BAD_REQUEST).json({
                ok:false,
                err: err.message
            })
        })
    }

    @Get('reset/:username')
    async reset(@Res() res: Response,@Param('username') userID: string){
        this.authService.resetPassword(userID)
        .then( user => {
            console.log(user)
            return res.status(HttpStatus.OK).json({
                ok: true, 
                message: "Solicitud de cambio de clave exitosa, revise su email",
                token: user.reset_token
            })
        })
        .catch( err => {
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST).json({ 
                ok: false, message: err 
            })
        })
    }

    @Post('reset/:token')
    async newPass(@Res() res: Response, @Param('token') token: string, @Body() newPasswordDTO: NewPasswordDTO){
        this.authService.newPassword(token, newPasswordDTO)
        .then( user => {
            return res.status(HttpStatus.OK).json({
                ok: true, message: "Clave cambiada exitosamente" 
            })
        })
        .catch( err => {
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST).json({ 
                err 
            })
        })
    }

    @Get('logout')
    async logoutUser(@Res() res: Response, @Headers('authorization') token: string){
        token = token.split(' ')[1];
        this.authService.logout(token)
        .then( user => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                message: 'Sesion cerrada'
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        })
        
    }



}
