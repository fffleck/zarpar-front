import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string;
    enterpriseName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    enterpriseName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;