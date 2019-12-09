import { Injectable, Inject } from '@nestjs/common';
import { Medicion } from './interface/medicion.interface'
import { Model } from 'mongoose';
@Injectable()
export class MedicionService {
    constructor(
        @Inject('MEDICION_MODEL') private readonly medicionModel){}


    async getMedicion(desde:Date,hasta:Date, options: Object){
        const query = { date: { $gte: desde, $lte: hasta }};
        let all = await this.medicionModel.findAndFilter(query, options, []);
        let total = await this.medicionModel.findAndFilter(query,options,[], false)
        total = total.length;    
        return { all, total }
    }

}
