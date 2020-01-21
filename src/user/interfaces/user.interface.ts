import { Document } from 'mongoose';

interface UserData {
    name?: string;
    last_name?: string;
}

interface Role {
    admin: boolean;
    control: boolean;
    view: boolean;
}

export interface User extends Document{
    username: string;
    password?: string;
    email: string;
    active?: boolean;
    reset_password?: boolean;
    reset_token?: string;
    userdata?: UserData;
    role: Role;

    checkPassword: Function;
    findAndFilter: Function;
}
