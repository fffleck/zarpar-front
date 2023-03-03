import { login } from '../controllers/auth/login';
import { verifyToken } from '../controllers/auth/verifyToken';
import express, { Router } from "express";
const routes:Router = express.Router();

// Filtros
routes.post('/login', login)
routes.get('/verifyToken', verifyToken)

export default routes;