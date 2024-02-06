"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PortoSchema = new mongoose_1.default.Schema({
    port_id: {
        type: String,
        required: true,
        unique: true
    },
    port_name: {
        type: String,
        required: true,
    },
    port_code: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    lat_float: {
        type: Number,
        required: true
    },
    lon_float: {
        type: Number,
        required: true
    },
});
const Porto = mongoose_1.default.model("Porto", PortoSchema);
exports.default = Porto;
