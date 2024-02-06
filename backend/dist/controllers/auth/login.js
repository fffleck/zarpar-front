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
exports.login = void 0;
const user_service_1 = __importDefault(require("../../services/user.service"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const KEY_JWT = 'karavel2023jwt';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const { email, password } = req.body.userData;
    const passwordHash = crypto_js_1.default.MD5(password).toString(crypto_js_1.default.enc.Hex);
    if (email === undefined || password === undefined) {
        res.status(401).json({
            success: false,
            message: "Ocorreu um problema ao logar.",
        });
    }
    else {
        const user = yield user_service_1.default.getByEmail(email);
        //Usuário encontrado e validado
        if (user.length > 0 && user[0].password === passwordHash) {
            const usuarioEncontrado = user[0];
            const tokenData = { nome: usuarioEncontrado.name, email: usuarioEncontrado.email };
            const generatedToken = jsonwebtoken_1.default.sign(tokenData, KEY_JWT, { expiresIn: '240m' });
            res.json({
                success: true,
                token: generatedToken,
                email: email,
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: "e-mail e/ou senhas inválidos."
            });
        }
    }
});
exports.login = login;
