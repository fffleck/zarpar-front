"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TipoContainer_1 = __importDefault(require("../models/TipoContainer"));
const TipoContainerDepara_1 = __importDefault(require("../models/TipoContainerDepara"));
const create = (body) => TipoContainer_1.default.create(body);
const createDepara = (body) => TipoContainerDepara_1.default.create(body);
const getAll = () => TipoContainer_1.default.find();
exports.default = {
    create,
    createDepara,
    getAll
};
