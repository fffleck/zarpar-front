import { IUser } from "../models/User";
import User from "../models/User";
import { IUserToken } from "../models/UserToken";
import UserToken from "../models/UserToken";

interface usertoken {
  email: string;
  token: string;
}

// USER
const create = (body: IUser) => User.create(body);
const getByEmail = (emailRequerido: string | any) =>
  User.find({ email: emailRequerido });

const getOneByEmail = (emailRequerido: string | any) =>
  User.findOne({ email: emailRequerido });

const updatePassword = async (
  emailRequerido: string | any,
  password: string | any
) => {
  const user = await User.findOne({ email: emailRequerido });
  if (!user) {
    throw "Erro ao atualizar, usuario não encontrado.";
  }
  user.password = password;
  await user.save();
};
// USER TOKEN
const getUserToken = (token: string | any) =>
  UserToken.findOne({ token: token });

const updateUserToken = async (usertoken: IUserToken) => {
  const user = await UserToken.findOne({ email: usertoken.email });
  console.log(user);
  if (!user) {
    await UserToken.create(usertoken);
  } else {
    user.token = usertoken.token;
    await user.save();
  }
};

export default {
  create,
  getByEmail,
  getOneByEmail,
  getUserToken,
  updateUserToken,
  updatePassword,
};
