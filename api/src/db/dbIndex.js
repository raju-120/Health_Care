import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    const mongoDb= "mongodb+srv://care:<db_password>@cluster0.mnswpgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    console.log('MONGODB_URL db index:', mongoDb); // Log the URL
    try {
        if (!process.env.mongoDb) {
            throw new Error('mongoDb is not defined');
        }

        const connectionInstance = await mongoose.connect(process.env.mongoDb, {
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
