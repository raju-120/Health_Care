import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { seedDepartments } from "../controllers/auth.controller.js";


const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB}/${DB_NAME}`)
        console.log(`MONGODB Connected !! DB HOST : ${connectionInstance.connection.host}`);
        seedDepartments();
    }catch(error){
        console.log("MONGODB connection failed", error);
        process.exit(1);
    }
};


export default connectDB;