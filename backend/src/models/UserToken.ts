import mongoose from "mongoose";

export interface IUserToken extends mongoose.Document {
  email: string;
  token: string;
}

const UserTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const UserToken = mongoose.model<IUserToken>("UserToken", UserTokenSchema);

export default UserToken;
