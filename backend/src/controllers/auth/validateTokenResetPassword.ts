import { Request, Response } from "express";
import userService from "../../services/user.service";
import UserToken, { IUserToken } from "../../models/UserToken";
import { IUser } from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const KEY_JWT = "karavel2023jwt";

interface IVerifiedToken {
  success: boolean;
  user?: IUserToken;
}

export const validadeTokenPassword = async (
  token: any
): Promise<IVerifiedToken> => {
  // Verificar se o token fornecido é válido
  if (!token) {
    return {
      success: false,
      user: undefined,
    };
  }

  const user = await userService.getUserToken(token);
  if (!user) {
    return {
      success: false,
      user: undefined,
    };
  }
  // Verificar se o token é válido e ainda está dentro do prazo de validade
  try {
    jwt.verify(token, KEY_JWT);
    return {
      success: true,
      user: user,
    };
  } catch (e) {
    return {
      success: false,
      user: undefined,
    };
  }
};
