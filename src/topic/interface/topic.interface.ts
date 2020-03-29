import { Document } from "mongoose";

export interface Topic extends Document {
    name:string;
    topic:string;
    active:boolean;
}