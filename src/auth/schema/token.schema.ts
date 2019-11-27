import * as mongoose from 'mongoose';

export const AuthTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    expire: {
        type: Date,
    }
}, {timestamps:{createdAt: 'created',updatedAt: 'updated'}})