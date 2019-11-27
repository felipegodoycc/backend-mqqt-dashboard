import { Document } from 'mongoose';

export interface AuthToken extends Document{
    token: string;
    user: string;
    expire: Date;
}