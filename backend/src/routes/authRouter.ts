import { login } from "../controllers/auth/login";
import { verifyToken } from "../controllers/auth/verifyToken";
import { forgotPassword } from "../controllers/auth/forgotPassword";
import { resetPassword } from "../controllers/auth/resetPassword";
import express, { Router } from "express";
const routes: Router = express.Router();

// Filtros
routes.post("/login", login);
routes.get("/verifyToken", verifyToken);
routes.post("/forgotPassword", forgotPassword);
routes.post("/resetPassword/:token", resetPassword);

export default routes;
