import { register } from '../controllers/user/register';
import { find_user } from '../controllers/user/find_user';
import express, { Router } from "express";
const routes:Router = express.Router();

// Filtros
routes.post('/register', register)
routes.post('/find_user', find_user)

export default routes;