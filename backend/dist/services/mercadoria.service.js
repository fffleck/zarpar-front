"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mercadoria_1 = __importDefault(require("../models/Mercadoria"));
const MarcadoriaDepara_1 = __importDefault(require("../models/MarcadoriaDepara"));
const create = (body) => Mercadoria_1.default.create(body);
const createDepara = (body) => MarcadoriaDepara_1.default.create(body);
const getAll = () => Mercadoria_1.default.find();
exports.default = {
    create,
    createDepara,
    getAll
};
