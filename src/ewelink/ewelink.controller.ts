import { Controller, Get, Res, HttpStatus, Param, Put, Query, Body } from '@nestjs/common';
import { Response } from 'express';
import { EwelinkService } from './ewelink.service';

@Controller('ewelink/device')
export class EwelinkController {
    constructor(private ewelinkService: EwelinkService){
    }

    @Get()
    async getDevices(@Res() res: Response ){
        this.ewelinkService.getDevices()
        .then( data => {
            res.status(HttpStatus.OK).json({
                devices: data,
                ok: true
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

    @Get(':id')
    async getDevice(@Res() res: Response, @Param('id') deviceID: string){
        this.ewelinkService.getDevice(deviceID)
        .then( device => {
            res.status(HttpStatus.OK).json({
                device,
                ok: true
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

    @Get(':id/state')
    async getState(@Res() res: Response, @Param('id') deviceID: string ){
        this.ewelinkService.getDeviceState(deviceID)
        .then( status => {
            res.status(HttpStatus.OK).json({
                ok: true,
                status
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

    @Get(':id/power-usage')
    async getPowerUsage(@Res() res: Response, @Param('id') deviceID: string ){
        this.ewelinkService.getPowerUsage(deviceID)
        .then( status => {
            res.status(HttpStatus.OK).json({
                ok: true,
                status
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

    @Get(':id/toggle/channel/:ch')
    async toggleDevice(@Res() res: Response, @Param('id') deviceID: string, @Param('ch') channel:string) {
        this.ewelinkService.toogleDevice(deviceID,channel)
        .then( status => {
            res.status(HttpStatus.OK).json({
                ok: true,
                status
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

    @Put(':id/set/:status')
    async setStatus(@Res() res: Response, @Param('id') deviceID: string, @Param('status') status: string, @Body() body){
        this.ewelinkService.setDeviceState(deviceID,status,body)
        .then( status => {
            res.status(HttpStatus.OK).json({
                ok: true,
                status
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

}
