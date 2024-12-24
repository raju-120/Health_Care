import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        console.log('MONGODB_URL-Index:', process.env.MONGODB_URL); // Debug log
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
