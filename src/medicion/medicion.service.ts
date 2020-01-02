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

    async getPorHora(desde:Date, hasta:Date, topic: string){
        let all = await this.medicionModel.aggregate([
            { $match: {
                        date: {
                                $gte: new Date(desde),
                                $lte: new Date(hasta) },
                        topic }
                    },
            { $project: { value: 1, topic: 1 , hora: { $hour: '$date'} }},
            { $group: { _id: '$hora', value: { $avg: '$value'} }},
            { $sort: { _id: 1 }},
           ])

        return all;
    }

}
