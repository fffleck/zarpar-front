import { mercadorias, portos_descarga, portos_embarque, tipos_container, tipos_mercadoria } from '../controllers/filtersController';
import express, { Router } from "express";
const routes:Router = express.Router();

// Filtros
routes.get('/mercadorias', mercadorias)
routes.get('/portos_descarga', portos_descarga)
routes.get('/portos_embarque', portos_embarque)
routes.get('/tipos_container', tipos_container)
routes.get('/tipos_mercadoria', tipos_mercadoria)

export default routes;
