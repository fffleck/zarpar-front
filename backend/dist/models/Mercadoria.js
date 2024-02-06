"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MercadoriaSchema = new mongoose_1.default.Schema({
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
const Mercadoria = mongoose_1.default.model("Mercadoria", MercadoriaSchema);
exports.default = Mercadoria;
