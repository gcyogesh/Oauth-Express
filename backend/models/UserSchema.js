import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId:String,
    displayName:String, 
    email:String,
    image:String,
}, {timestamps:true})

const UserModel = mongoose.model('GoogleUsers', UserSchema)

export default UserModel;