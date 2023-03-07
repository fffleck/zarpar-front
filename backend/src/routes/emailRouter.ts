import { send_analysis } from '../controllers/email/send_analysis';
import { send_client } from '../controllers/email/send_client';
import express, { Router } from "express";
const routes:Router = express.Router();

// Filtros
routes.post('/send_analysis', send_analysis);
routes.post('/send_client', send_client);

export default routes;