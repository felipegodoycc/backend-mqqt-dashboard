import { 
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Get,
    Param,
    Put,
    Delete,
    Query,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
//@UseGuards(AuthGuard())
export class UserController {
    constructor(private userservice: UserService){}

    @Post()
    async addUser(@Res() res: Response, @Body('data') createUserDTO: CreateUserDTO){
        this.userservice.addUser(createUserDTO)
        .then( user => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                user
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

    @Get(':id')
    async getUser(@Res() res, @Param('id') userID:string){
        this.userservice.getUser(userID)
        .then( user => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                user
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

    @Get()
    async getUsers(@Res() res: Response, @Query() options ){
        this.userservice.getAllUser(options)
        .then( data => {
            return res.status(HttpStatus.OK).json({
                ok: true,
                items: data.all,
                total: data.total
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

    @Put(':id')
    async updateUser(@Res() res, @Param('id') userID, @Body('data') createUserDTO: CreateUserDTO){
        this.userservice.updateUser(userID, createUserDTO)
        .then( user => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                user
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

    @Delete(':id')
    async deleteUser(@Res() res, @Param('id') userID){
        this.userservice.deleteUser(userID)
        .then( user => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                user
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
