import { Injectable, Inject } from '@nestjs/common';
import { Medicion } from './interface/medicion.interface';
import { Model } from 'mongoose';
@Injectable()
export class MedicionService {
    constructor(
        @Inject('MEDICION_MODEL') private readonly medicionModel) {}

    async getMedicion(desde: Date, hasta: Date, options: object) {
        const query = { date: { $gte: desde, $lte: hasta }};
        const all = await this.medicionModel.findAndFilter(query, options, []);
        let total = await this.medicionModel.findAndFilter(query, options, [], false);
        total = total.length;
        return { all, total };
    }

    async getPorHora(desde: Date, hasta: Date, topic: string) {
        const all = await this.medicionModel.aggregate([
            { $match: {
                        date: {
                                $gte: new Date(desde),
                                $lte: new Date(hasta) },
                        topic },
                    },
            { $project: { value: 1, topic: 1 , hora: { $hour: { date: '$date', timezone: 'America/Santiago'}} }},
            { $group: { _id: '$hora', value: { $avg: '$value'} }},
            { $sort: { _id: 1 }},
           ]);

        return all;
    }

    async getUltimoRegistro(topic: string) {
        const registro = await this.medicionModel.find({ topic: 'casa/patio/temp' }).sort({ _id: -1}).limit(1);
        return registro[0];
    }

}
