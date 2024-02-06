"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TipoMercadoriaDeparaSchema = new mongoose_1.default.Schema({
    idArmador: {
        type: String,
        required: true
    },
    idItem: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});
const TipoMercadoriaDepara = mongoose_1.default.model("TipoMercadoriaDepara", TipoMercadoriaDeparaSchema);
exports.default = TipoMercadoriaDepara;
