import { register } from '../controllers/user/register';
import express, { Router } from "express";
const routes:Router = express.Router();

// Filtros
routes.post('/register', register)

export default routes;