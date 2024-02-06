"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FreteMaritmoSchema = new mongoose_1.default.Schema({
    mercadoria: {
        type: String,
        required: true
    },
    id_mercadoria: {
        type: String,
        required: true
    },
    tipo_mercadoria: {
        type: String,
        required: true
    },
    id_tipo_mercadoria: {
        type: String,
        required: true
    },
    tipo_container: {
        type: String,
        required: true
    },
    id_tipo_container: {
        type: String,
        required: true
    },
    porto_embarque: {
        type: String,
        required: true
    },
    id_porto_embarque: {
        type: String,
        required: true
    },
    porto_descarga: {
        type: String,
        required: true
    },
    id_porto_descarga: {
        type: String,
        required: true
    },
    armador: {
        type: String,
        required: true
    },
    id_armador: {
        type: String,
        required: true
    },
    nome_navio: {
        type: String,
        required: true
    },
    data_embarque: {
        type: String,
        required: true
    },
    tempo_de_transito: {
        type: String,
        required: true
    },
    data_chegada: {
        type: String,
        required: true
    },
    frete: {
        type: String,
        required: true
    },
    transbordo: {
        type: String,
        required: true
    },
});
const FreteMaritmo = mongoose_1.default.model("FreteMaritmo", FreteMaritmoSchema);
exports.default = FreteMaritmo;
