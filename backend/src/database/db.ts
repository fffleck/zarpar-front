import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export default function connectDatabase(){
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
      {dbName: process.env.MONGODB_NAME},
      (err) => {
        if (err) {
          console.error('FAILED TO CONNECT TO MONGODB');
          console.error(err);
        } else {
          console.log('CONNECTED TO MONGODB');
        }
      }
    )
}; 
