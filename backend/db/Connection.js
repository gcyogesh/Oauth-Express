import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const DB = process.env.DATABASE;

const Connection = ()=>{
    mongoose.connect(DB).then(()=>{
          console.log("Databse connected sucessfully!")
    }).catch((err)=>{
        console.log(err,"Unable to connect data")
    })
}

export default Connection;