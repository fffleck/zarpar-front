"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../controllers/auth/login");
const verifyToken_1 = require("../controllers/auth/verifyToken");
const forgotPassword_1 = require("../controllers/auth/forgotPassword");
const resetPassword_1 = require("../controllers/auth/resetPassword");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Filtros
routes.post("/login", login_1.login);
routes.get("/verifyToken", verifyToken_1.verifyToken);
routes.post("/forgotPassword", forgotPassword_1.forgotPassword);
routes.post("/resetPassword/:token", resetPassword_1.resetPassword);
exports.default = routes;
