import { validadeTokenPassword } from "./validateTokenResetPassword";
import { Request, Response } from "express";
import userService from "../../services/user.service";
import User, { IUser } from "../../models/User";
import UserToken, { IUserToken } from "../../models/UserToken";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const KEY_JWT = "karavel2023jwt";

export const resetPassword = async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const { token } = req.params;
  const { password } = req.body;

  const verifiedToken = await validadeTokenPassword(token);
  console.log(verifiedToken);
  if (
    verifiedToken &&
    verifiedToken.success &&
    verifiedToken.user &&
    verifiedToken.user.email
  ) {
    // atualiza senha do usuário
    const newPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
    try {
      userService.updatePassword(verifiedToken.user.email, newPassword);
    } catch (e) {
      res.status(400).json({ error: "Usuário não encontrado." });
    }
    res.json({ message: "Senha atualizada com sucesso" });
  } else {
    res.status(400).json({ error: "Token inválido ou expirado" });
  }
};
