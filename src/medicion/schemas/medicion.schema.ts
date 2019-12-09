import * as mongoose from 'mongoose';

export const MedicionSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    topic:{
        type: String
    },
    value: {
        type: Number
    },
    tipo: {
        type: String
    }
});
