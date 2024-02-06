"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("../controllers/user/register");
const find_user_1 = require("../controllers/user/find_user");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Filtros
routes.post('/register', register_1.register);
routes.post('/find_user', find_user_1.find_user);
exports.default = routes;
