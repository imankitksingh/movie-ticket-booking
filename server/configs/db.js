import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/minecraftmovie`)
    } catch (error) {
        console.log(error.message)
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
    }
}

export default connectDB;