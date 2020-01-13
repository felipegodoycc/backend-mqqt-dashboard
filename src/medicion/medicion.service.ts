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

    async getPorHora(desde: Date, hasta: Date, topics: string) {
        const topics2 = topics.split(',');
        const all = await this.medicionModel.aggregate([
                    { $match: {
                                date: {
                                    $gte: new Date(desde),
                                    $lte: new Date(hasta) },
                                topic: { $in: topics2 }  },
                            },
                    { $project: { value: 1, topic: 1 , hora: { $hour: { date: '$date', timezone: 'America/Santiago'}} }},
                    { $group: { _id: { topic: '$topic', hora: '$hora' }, value: { $avg: '$value'}, min: { $min: "$value"}, max: { $max: "$value"} }},
                    { $sort: { _id: 1 }} ,
                    { $group: { _id: '$_id.topic', values: { $push: { value: '$value', hora: '$_id.hora', min: "$min", max: "$max" } } } },
                    { $project: { _id: 1, 'values.value': 1 , 'values.hora':1 , minValue: { $min: "$values.min" }, maxValue: { $max: "$values.max" } }}
                   ]);
        return all;
    }

    async getUltimoRegistro(topic: string) {
        const registro = await this.medicionModel.find({ topic }).sort({ _id: -1}).limit(1);
        return registro[0];
    }

}
