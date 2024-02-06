"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TipoMercadoria_1 = __importDefault(require("../models/TipoMercadoria"));
const TipoMercadoriaDepara_1 = __importDefault(require("../models/TipoMercadoriaDepara"));
const create = (body) => TipoMercadoria_1.default.create(body);
const createDepara = (body) => TipoMercadoriaDepara_1.default.create(body);
const getAll = () => TipoMercadoria_1.default.find();
exports.default = {
    create,
    createDepara,
    getAll
};
