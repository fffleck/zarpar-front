import mongoose from "mongoose";
export default function connectDatabase(){
  mongoose
    .connect(
      `mongodb+srv://karavel_app:karavelapp2023@cluster0.oem86y1.mongodb.net/karavel?retryWrites=true&w=majority`,
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
