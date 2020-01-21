import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../interfaces/user.interface';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username ya esta en uso'],
        required: [true, 'El nombre de usuario es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    email: {
        type: String,
        lowercase: true,
        required: ['true', 'Email es obligatorio'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email incorrecto']
    },
    role: {
        admin: {
            type: Boolean,
            default: false,
        },
        control: {
            type: Boolean,
            default: false,
        },
        view: {
            type: Boolean,
            default: true,
        }
    },
    userdata : {
        name: {
            type: String,
        },
        lastname: {
            type: String,
        },
    },
    active: {
        type: Boolean,
        default: true
    },
    reset_password: {
        type: Boolean,
        default: false
    },
    reset_token: {
        type: String
    }
}, {timestamps:{createdAt: 'created',updatedAt: 'updated'}})

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.pre<User>('save', function(next) {
    if(!this.isModified('password')) return next();
    console.log("Ejecuta middle pre")
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

UserSchema.methods.checkPassword = function(loginPassword){
    // console.log(this.password)
    return bcrypt.compareSync(loginPassword, this.password);
     
};


export default UserSchema;