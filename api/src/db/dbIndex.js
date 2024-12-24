import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use the connection string directly from the environment variable
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MONGODB Connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection failed", error);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;
