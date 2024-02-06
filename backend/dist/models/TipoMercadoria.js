"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TipoMercadoriaSchema = new mongoose_1.default.Schema({
    idItem: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
});
const TipoMercadoria = mongoose_1.default.model("TipoMercadoria", TipoMercadoriaSchema);
exports.default = TipoMercadoria;
