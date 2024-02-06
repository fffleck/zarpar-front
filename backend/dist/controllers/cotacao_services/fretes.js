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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fretes = void 0;
const zimController_1 = require("./zimController");
const searatesController_1 = require("./searatesController");
const cmaController_1 = require("./cmaController");
const fretes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container, } = req.query;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response_freight;
    response_freight = [];
    response_freight = yield adicionar_servico(response_freight, req, res, searatesController_1.searates);
    response_freight = yield adicionar_servico(response_freight, req, res, zimController_1.zim);
    // ERRO EVERGREEN
    // response_freight = await adicionar_servico(
    //   response_freight,
    //   req,
    //   res,
    //   evergreen
    // );
    response_freight = yield adicionar_servico(response_freight, req, res, cmaController_1.cma);
    let msg_default = [
        {
            shipment_id: "1",
            tipo_container: "",
            id_tipo_container: "",
            porto_embarque: "TBI",
            id_porto_embarque: "",
            porto_descarga: "TBI",
            id_porto_descarga: "",
            armador: "MSC",
            id_armador: "",
            navio: "",
            data_embarque: "TBI",
            tempo_de_transito: "",
            data_chegada: "",
            frete: "",
            imagem_link: "/imagens/msc.png",
        },
        {
            shipment_id: "1",
            tipo_container: "",
            id_tipo_container: "",
            porto_embarque: "TBI",
            id_porto_embarque: "",
            porto_descarga: "TBI",
            id_porto_descarga: "",
            armador: "One",
            id_armador: "",
            navio: "",
            data_embarque: "TBI",
            tempo_de_transito: "",
            data_chegada: "",
            frete: "",
            imagem_link: "/imagens/one.png",
        },
        {
            shipment_id: "1",
            tipo_container: "",
            id_tipo_container: "",
            porto_embarque: "TBI",
            id_porto_embarque: "",
            porto_descarga: "TBI",
            id_porto_descarga: "",
            armador: "Hapag-Lloyd",
            id_armador: "",
            navio: "",
            data_embarque: "TBI",
            tempo_de_transito: "",
            data_chegada: "",
            frete: "",
            imagem_link: "/imagens/hapag.png",
        },
        {
            shipment_id: "1",
            tipo_container: "",
            id_tipo_container: "",
            porto_embarque: "TBI",
            id_porto_embarque: "",
            porto_descarga: "TBI",
            id_porto_descarga: "",
            armador: "Cosco Shipping",
            id_armador: "",
            navio: "",
            data_embarque: "TBI",
            tempo_de_transito: "",
            data_chegada: "",
            frete: "",
            imagem_link: "/imagens/cosco.png",
        },
    ];
    response_freight = response_freight.concat(msg_default);
    if (response_freight.length === 0) {
        console.log({
            message: "[COTAÇÕES] Fretes nao encontrado.",
        });
        res.status(200).json(msg_default);
    }
    else {
        res.status(200).json(response_freight);
    }
});
exports.fretes = fretes;
const adicionar_servico = (arr, req, res, service) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PASSOU AQUI ");
    try {
        let res_service;
        res_service = yield service(req, res);
        res_service = res_service.concat(arr);
        return res_service;
    }
    catch (e) {
        return arr;
    }
});
