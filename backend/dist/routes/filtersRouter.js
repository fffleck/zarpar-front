"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filtersController_1 = require("../controllers/filtersController");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Filtros
routes.get('/mercadorias', filtersController_1.mercadorias);
routes.get('/portos_descarga', filtersController_1.portos_descarga);
routes.get('/portos_embarque', filtersController_1.portos_embarque);
routes.get('/tipos_container', filtersController_1.tipos_container);
routes.get('/tipos_mercadoria', filtersController_1.tipos_mercadoria);
exports.default = routes;
