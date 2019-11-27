import { Document } from 'mongoose';

interface UserData {
    name?: string;
    last_name?: string;
}

export interface User extends Document{
    username: string;
    password?: string;
    email: string;
    active?: boolean;
    reset_password?: boolean;
    reset_token?: string;
    userdata?: UserData;

    checkPassword: Function;
    findAndFilter: Function;
}
