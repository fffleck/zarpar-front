"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Armador_1 = __importDefault(require("../models/Armador"));
const create = (body) => Armador_1.default.create(body);
exports.default = {
    create,
};
