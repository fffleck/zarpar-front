import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/User";
import { IUserToken } from "../../models/UserToken";
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../../config/mail_smtp");
import userService from "../../services/user.service";
const KEY_JWT = "karavel2023jwt";

export const forgotPassword = async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let email = req.body.email;
  // Verificar se o email fornecido corresponde a um usuário válido
  if (email) {
    email = email.toString();
  } else {
    return res.status(404).send({ message: "Email inválido." });
  }

  const user = await userService.getOneByEmail(email);
  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado." });
  }

  // Gerar um token de redefinição de senha
  const token = jwt.sign({ email: user.email }, KEY_JWT, {
    expiresIn: "1h",
  });

  // Armazenar o token no banco de dados para o usuário
  await userService.updateUserToken({
    email: user.email,
    token: token,
  } as IUserToken);

  // Enviar um email para o usuário com um link para redefinir a senha
  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `Karavel Shipping - <lephanyx@gmail.com>`,
    subject: `Recuperação de Senha`,
    to: user.email,
    html: `
      <p>Olá ${user.name},</p>
      <p>Recebemos uma solicitação para redefinir a senha da sua conta. Para redefinir sua senha, clique no link abaixo:</p>
      <a href="${process.env.BASE_URL}/reset-password/${token}">Redefinir senha</a>
      <p>O link expirará em 1 hora.</p>
      <p>Se você não solicitou a redefinição de senha, ignore este email.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
      return res.status(500).send({
        message: "Ocorreu um erro ao enviar o email de redefinição de senha.",
      });
    } else {
      console.log(info);
      return res.send({
        message: "Email de redefinição de senha enviado com sucesso.",
      });
    }
  });
};
