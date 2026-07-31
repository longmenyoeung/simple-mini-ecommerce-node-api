import mongoose from "mongoose";

const url = process.env.MONGODB_ATLAS;

const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to MongoDB");
        });
        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error :", err);
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected.");
        });
        //connect to url
        await mongoose.connect(url, { dbName: 'simple-mini-ecomerce-node-api'});
    } catch (error) {
        console.log('Mongodb connection error', error);
        process.exit(1);
    }
}

export default connectDb;