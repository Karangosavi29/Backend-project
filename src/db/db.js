import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => {
  try {
    const connnetionInstance =await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
    console.log(`\n MongoDB connnected: ${connnetionInstance.connection.host}`);
  } catch (error) {
    console.log("mongoo db connection error",error)
    process.exit(1);
  }
};


export default connectDB;