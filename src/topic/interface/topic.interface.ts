import { Document } from "mongoose";

export interface Topic extends Document {
    name:string;
    topic:string;
    unit:string;
    active:boolean;
}