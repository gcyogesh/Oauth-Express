import mongoose from "mongoose";


// Maybe yo schema lay sabai kam garxa  jastai discord addd garna man lagyo vani we can simply add discordId. 

const UserSchema = new mongoose.Schema({
    googleId:String, 
    facebookId: String,
    displayName:String, 
    email:String,
    image:String,
}, {timestamps:true})

const UserModel = mongoose.model('GoogleUsers', UserSchema)

export default UserModel;
