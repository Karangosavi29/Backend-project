// require("dotenv").config({path:'./env'});
import dotenv from "dotenv";

import connectDB from "./db/db.js";

dotenv.config({ path: "./.env" });


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`server is running on port ${process.env.PORT || 8000}`);
    })
})
.catch((err) =>{
    console.log("mongo db connection failedn!!",err)
})






























/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
    console.log("connected to db successfully");
    app.on("errror", (error) => {
      console.log("error while connecting to express", error);
      throw error;
    });
    app.listen(process.env.port, () => {
      console.log(`server is running on port ${process.env.port}`);
    });
  } catch (error) {
    console.error("error while connecting to db", error);
    throw error;
  }
})();
*/