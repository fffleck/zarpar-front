"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos_mercadoria = exports.tipos_container = exports.portos_descarga = exports.portos_embarque = exports.mercadorias = void 0;
const mercadoria_service_1 = __importDefault(require("../services/mercadoria.service"));
const porto_service_1 = __importDefault(require("../services/porto.service"));
const tipo_container_service_1 = __importDefault(require("../services/tipo_container.service"));
const tipo_mercadoria_service_1 = __importDefault(require("../services/tipo_mercadoria.service"));
const mercadorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response = yield mercadoria_service_1.default.getAll();
    res.status(200).json(response);
});
exports.mercadorias = mercadorias;
const portos_embarque = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response = yield porto_service_1.default.getAll();
    // res.status(200).json(response.filter((porto)=> porto.incluiEmbarque));
    res.status(200).json(response);
});
exports.portos_embarque = portos_embarque;
const portos_descarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response = yield porto_service_1.default.getAll();
    res.status(200).json(response);
    // res.status(200).json(response.filter((porto)=> porto.incluiChegada));
});
exports.portos_descarga = portos_descarga;
const tipos_container = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response = yield tipo_container_service_1.default.getAll();
    res.status(200).json(response);
});
exports.tipos_container = tipos_container;
const tipos_mercadoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response = yield tipo_mercadoria_service_1.default.getAll();
    res.status(200).json(response);
});
exports.tipos_mercadoria = tipos_mercadoria;
