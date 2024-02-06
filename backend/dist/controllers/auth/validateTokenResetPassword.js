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
exports.validadeTokenPassword = void 0;
const user_service_1 = __importDefault(require("../../services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const KEY_JWT = "karavel2023jwt";
const validadeTokenPassword = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar se o token fornecido é válido
    if (!token) {
        return {
            success: false,
            user: undefined,
        };
    }
    const user = yield user_service_1.default.getUserToken(token);
    if (!user) {
        return {
            success: false,
            user: undefined,
        };
    }
    // Verificar se o token é válido e ainda está dentro do prazo de validade
    try {
        jsonwebtoken_1.default.verify(token, KEY_JWT);
        return {
            success: true,
            user: user,
        };
    }
    catch (e) {
        return {
            success: false,
            user: undefined,
        };
    }
});
exports.validadeTokenPassword = validadeTokenPassword;
