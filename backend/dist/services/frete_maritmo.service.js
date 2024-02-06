"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FreteMaritmo_1 = __importDefault(require("../models/FreteMaritmo"));
const create = (body) => FreteMaritmo_1.default.create(body);
const getAll = () => FreteMaritmo_1.default.find();
exports.default = {
    create,
    getAll
};
