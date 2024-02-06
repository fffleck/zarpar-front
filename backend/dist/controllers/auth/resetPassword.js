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
exports.resetPassword = void 0;
const validateTokenResetPassword_1 = require("./validateTokenResetPassword");
const user_service_1 = __importDefault(require("../../services/user.service"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const KEY_JWT = "karavel2023jwt";
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    const { token } = req.params;
    const { password } = req.body;
    const verifiedToken = yield (0, validateTokenResetPassword_1.validadeTokenPassword)(token);
    console.log(verifiedToken);
    if (verifiedToken &&
        verifiedToken.success &&
        verifiedToken.user &&
        verifiedToken.user.email) {
        // atualiza senha do usuário
        const newPassword = crypto_js_1.default.MD5(password).toString(crypto_js_1.default.enc.Hex);
        try {
            user_service_1.default.updatePassword(verifiedToken.user.email, newPassword);
        }
        catch (e) {
            res.status(400).json({ error: "Usuário não encontrado." });
        }
        res.json({ message: "Senha atualizada com sucesso" });
    }
    else {
        res.status(400).json({ error: "Token inválido ou expirado" });
    }
});
exports.resetPassword = resetPassword;
