import { cmaController } from "./../controllers/cotacao_services/cmaController";
import { fretes } from "../controllers/cotacao_services/fretes";
import { searatesController } from "../controllers/cotacao_services/searatesController";
import { zimController } from "../controllers/cotacao_services/zimController";
import { evergreenController } from "../controllers/cotacao_services/evergreenController";
import express, { Router } from "express";
const routes: Router = express.Router();

// Cotação Services
routes.get("/fretes", fretes); // retorna todos os fretes
routes.get("/searates", searatesController); // retorna apenas fretes da searates
routes.get("/zim", zimController); // retorna apenas fretes da zim
routes.get("/evergreen", evergreenController); // retorna apenas fretes da evergreen
routes.get("/cma", cmaController); // retorna apenas fretes da evergreen

export default routes;
