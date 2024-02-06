"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_quotation_1 = require("./../controllers/email/send_quotation");
const send_analysis_1 = require("../controllers/email/send_analysis");
const send_client_1 = require("../controllers/email/send_client");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Filtros
routes.post("/send_analysis", send_analysis_1.send_analysis);
routes.post("/send_quotation", send_quotation_1.send_quotation);
routes.post("/send_client", send_client_1.send_client);
exports.default = routes;
