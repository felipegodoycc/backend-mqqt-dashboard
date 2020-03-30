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
    unit: {
        type: String
    },
    type: {
        type: String
    },
    minValue: {
        type: Number,
        default: 0
    },
    maxValue: {
        type: Number,
        default: 100
    },
    onSwitchValue: {
        type: String,
    },
    offSwitchValue: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});
