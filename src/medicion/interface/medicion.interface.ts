import { Document } from "mongoose";

export interface Medicion extends Document {
    date:Date;
    topic: String;
    value: Number;
    tipo: String;
}