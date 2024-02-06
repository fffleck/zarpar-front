"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evergreen = exports.evergreenController = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../../utils");
const evergreenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container, } = req.query;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response_freight;
    response_freight = [];
    response_freight = yield (0, exports.evergreen)(req, res);
    if (response_freight.length === 0) {
        res.status(200).json({
            message: "Frete nao encontrado.",
        });
    }
    else {
        res.status(200).json(response_freight);
    }
});
exports.evergreenController = evergreenController;
const evergreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container, } = req.query;
    if (!data_saida || !porto_embarque || !porto_descarga || !tipo_container) {
        return [];
    }
    let response_freight;
    response_freight = [];
    try {
        // Tratar data
        let data_saida_evergreen = (0, utils_1.formataData2)(new Date(data_saida));
        try {
            let api_evergreen_res = yield axios_1.default.get(`http://localhost:3334/evergreen?data_saida=${data_saida_evergreen}&porto_embarque=${porto_embarque}&porto_descarga=${porto_descarga}&tipo_container=${tipo_container}`);
            // let api_evergreen_res = await axios.get(
            //   `https://karavel-services-e63c55605b2e.herokuapp.com/evergreen?data_saida=${data_saida_evergreen}&porto_embarque=${porto_embarque}&porto_descarga=${porto_descarga}&tipo_container=${tipo_container}`
            // );
            console.log('Passou pelo Evergreen');
            api_evergreen_res.data.forEach((result) => {
                response_freight.push(result);
            });
        }
        catch (e) {
            console.log("Evergreen não trouxe resultados.");
        }
        if (response_freight.length === 0) {
            return [];
        }
        else {
            return response_freight;
        }
    }
    catch (e) {
        // Tratar erro
        console.log(e);
        return [];
    }
});
exports.evergreen = evergreen;
