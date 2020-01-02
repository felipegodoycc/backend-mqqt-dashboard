import { Controller, Get, Res, Param, HttpStatus, Query } from '@nestjs/common';
import { MedicionService } from './medicion.service';
import { Response } from 'express';
import { getHeapStatistics } from 'v8';

@Controller('medicion')
export class MedicionController {
    constructor(private medicionService: MedicionService){

    }

    @Get('desde/:desde/hasta/:hasta')
    async getMedicion(@Res() res: Response, @Param('desde') desde: Date, @Param('hasta') hasta:Date, @Query() options){
        this.medicionService.getMedicion(desde,hasta, options)
        .then( data => {
            return res.status(HttpStatus.OK).json({
                ok: true,
                items: data.all,
                total: data.total
            })
        })
        .catch( err =>{ 
            console.log("Error ", err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                err
            })
        })
    }

    @Get('porHoras/desde/:desde/hasta/:hasta/')
    async GetMedicionesPorHora(@Res() res:Response, @Param('desde') desde, @Param('hasta') hasta, @Query('topic') topic){
        this.medicionService.getPorHora(desde,hasta,topic)
        .then( data => {
            return res.status(HttpStatus.OK).json({
                ok: true,
                items: data,
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
