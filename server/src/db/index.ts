import mongoose from 'mongoose'
import 'dotenv/config'
import { log } from 'console'


async function connectDB (){
    try {
        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect (`${dbURI}`);
        log ("DB connected successfully");
    } 
    catch (error) {
        log ("MongoDB connection failure: ", error);    
    }
}

export default connectDB();