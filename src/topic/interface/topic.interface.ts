import { Document } from "mongoose";

export interface Topic extends Document {
    date:Date;
    topic: String;
    value: Number;
    tipo: String;
}