import * as mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});
