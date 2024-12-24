import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    const mongoDb= process.env.MONGODB_URL;
    console.log('MONGODB_URL db index:', mongoDb); // Log the URL
    try {
        if (!mongoDb) {
            throw new Error('mongoDb is not configured in .env file');
        }

        const connectionInstance = await mongoose.connect(mongoDb, {
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
