import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));
}

// mongoose.connect(config.MONGO_URI)
// .then(() => console.log("DB connected"))
// .catch(err => console.log(err));

export default connectDB;