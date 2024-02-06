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
const User_1 = __importDefault(require("../models/User"));
const UserToken_1 = __importDefault(require("../models/UserToken"));
// USER
const create = (body) => User_1.default.create(body);
const getByEmail = (emailRequerido) => User_1.default.find({ email: emailRequerido });
const getOneByEmail = (emailRequerido) => User_1.default.findOne({ email: emailRequerido });
const updatePassword = (emailRequerido, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: emailRequerido });
    if (!user) {
        throw "Erro ao atualizar, usuario não encontrado.";
    }
    user.password = password;
    yield user.save();
});
// USER TOKEN
const getUserToken = (token) => UserToken_1.default.findOne({ token: token });
const updateUserToken = (usertoken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserToken_1.default.findOne({ email: usertoken.email });
    console.log(user);
    if (!user) {
        yield UserToken_1.default.create(usertoken);
    }
    else {
        user.token = usertoken.token;
        yield user.save();
    }
});
exports.default = {
    create,
    getByEmail,
    getOneByEmail,
    getUserToken,
    updateUserToken,
    updatePassword,
};
