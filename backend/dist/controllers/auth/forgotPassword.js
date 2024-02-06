"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../../config/mail_smtp");
const user_service_1 = __importDefault(require("../../services/user.service"));
const KEY_JWT = "karavel2023jwt";
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let email = req.body.email;
    // Verificar se o email fornecido corresponde a um usuário válido
    if (email) {
        email = email.toString();
    }
    else {
        return res.status(404).send({ message: "Email inválido." });
    }
    const user = yield user_service_1.default.getOneByEmail(email);
    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
    }
    // Gerar um token de redefinição de senha
    const token = jsonwebtoken_1.default.sign({ email: user.email }, KEY_JWT, {
        expiresIn: "1h",
    });
    // Armazenar o token no banco de dados para o usuário
    yield user_service_1.default.updateUserToken({
        email: user.email,
        token: token,
    });
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
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({
                message: "Ocorreu um erro ao enviar o email de redefinição de senha.",
            });
        }
        else {
            console.log(info);
            return res.send({
                message: "Email de redefinição de senha enviado com sucesso.",
            });
        }
    });
});
exports.forgotPassword = forgotPassword;
