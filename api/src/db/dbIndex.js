import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    console.log('MONGODB_URL:', process.env.MONGODB_URL); // Log the URL
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL is not defined');
        }

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MONGODB Connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
