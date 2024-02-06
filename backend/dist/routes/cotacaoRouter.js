"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cmaController_1 = require("./../controllers/cotacao_services/cmaController");
const fretes_1 = require("../controllers/cotacao_services/fretes");
const searatesController_1 = require("../controllers/cotacao_services/searatesController");
const zimController_1 = require("../controllers/cotacao_services/zimController");
const evergreenController_1 = require("../controllers/cotacao_services/evergreenController");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Cotação Services
routes.get("/fretes", fretes_1.fretes); // retorna todos os fretes
routes.get("/searates", searatesController_1.searatesController); // retorna apenas fretes da searates
routes.get("/zim", zimController_1.zimController); // retorna apenas fretes da zim
routes.get("/evergreen", evergreenController_1.evergreenController); // retorna apenas fretes da evergreen
routes.get("/cma", cmaController_1.cmaController); // retorna apenas fretes da evergreen
exports.default = routes;
