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
exports.searates = exports.searatesController = void 0;
const porto_service_1 = __importDefault(require("../../services/porto.service"));
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../../utils");
const searatesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container, } = req.query;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let response_freight;
    response_freight = [];
    response_freight = yield (0, exports.searates)(req, res);
    if (response_freight.length === 0) {
        res.status(200).json({
            message: "[SEARATES] Frete nao encontrado.",
        });
    }
    else {
        res.status(200).json(response_freight);
    }
});
exports.searatesController = searatesController;
const searates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container, } = req.query;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (!data_saida || !porto_embarque || !porto_descarga || !tipo_container) {
        return [];
    }
    let response_freight;
    response_freight = [];
    try {
        let portos = yield porto_service_1.default.getAll();
        let pe_obj = portos.find((porto) => porto.port_id.trim() === porto_embarque.trim());
        let pd_obj = portos.find((porto) => porto.port_id.trim() === porto_descarga.trim());
        let from = { lat: pe_obj === null || pe_obj === void 0 ? void 0 : pe_obj.lat_float, long: pe_obj === null || pe_obj === void 0 ? void 0 : pe_obj.lon_float };
        let to = { lat: pd_obj === null || pd_obj === void 0 ? void 0 : pd_obj.lat_float, long: pd_obj === null || pd_obj === void 0 ? void 0 : pd_obj.lon_float };
        let containers = {
            //Containers
            ST20: 1,
            ST40: 0,
            HQ40: 0,
            HQ45: 0,
            REF20: 0,
            REF40: 0,
        };
        // Construindo string dos containers
        let containers_str = "";
        if (containers.ST20 > 0) {
            containers_str += ` ST20: ${containers.ST20},`;
        }
        if (containers.ST40 > 0) {
            containers_str += ` ST40: ${containers.ST40},`;
        }
        if (containers.HQ40 > 0) {
            containers_str += ` HQ40: ${containers.HQ40},`;
        }
        if (containers.HQ45 > 0) {
            containers_str += ` HQ45: ${containers.HQ45},`;
        }
        if (containers.REF20 > 0) {
            containers_str += ` REF20: ${containers.REF20},`;
        }
        if (containers.REF40 > 0) {
            containers_str += ` REF40: ${containers.REF40},`;
        }
        containers_str = ` ${tipo_container}: 1,`;
        let platform_id = 4281;
        let token = (yield axios_1.default.get(`https://www.searates.com/auth/platform-token?id=${platform_id}`)).data["s-token"];
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        let data = JSON.stringify({
            query: `
   
     {
       shipment: fcl(from: [${from.lat}, ${from.long}],to: [${to.lat}, ${to.long}],${containers_str} , date: "${data_saida}",  currency: USD) {
         shipmentId
         transportationMode
         incoterms
         currency
         cityFrom: city(mode: EXPORT) {
           ...cityFields
         }
         cityTo: city(mode: IMPORT) {
           ...cityFields
         }
         portFrom: port(mode: EXPORT) {
           ...portFields
         }
         portTo: port(mode: IMPORT) {
           ...portFields
         }
         freight: oceanFreight {
           ...ratesFields
         }
       }
       default {
         services
         bookingViaEmail
       }
       identity {
         first_name
         last_name
         admin
         carrier
         dfa
         email
         phone
       }
     }
     
     fragment ratesFields on OceanFreight {
       shippingLine
       logo
       containerCode
       validTo
       containerType
       overdue
       co2
       quantity
       linerTerms
       originalPrice
       originalCurrency
       price
       distance
       comment
       transitTime
       transportFrom
       transportTo
       alternative
       portFeesFrom: portFees(mode: EXPORT) {
         ...portFeesFields
       }
       portFeesTo: portFees(mode: IMPORT) {
         ...portFeesFields
       }
       truckFrom: truck(mode: EXPORT) {
         originalPrice
         originalCurrency
         price
         comment
         distance
         transitTime
         interpolation
         co2
       }
       truckTo: truck(mode: IMPORT) {
         originalPrice
         originalCurrency
         price
         comment
         distance
         transitTime
         interpolation
         co2
       }
       railFrom: rail(mode: EXPORT) {
         originalPrice
         originalCurrency
         price
         distance
         transitTime
         interpolation
         co2
       }
       railTo: rail(mode: IMPORT) {
         originalPrice
         originalCurrency
         price
         distance
         transitTime
         interpolation
         co2
       }
       dryFrom: dry(mode: EXPORT) {
         price
         distance
         transitTime
         interpolation
         city(mode: EXPORT) {
           ...cityFields
         }
       }
       dryTo: dry(mode: IMPORT) {
         price
         distance
         transitTime
         interpolation
         city(mode: IMPORT) {
           ...cityFields
         }
       }
         bargeFrom: barge(mode: EXPORT) {
         price
         distance
         transitTime
         validTo
         currency
         co2
         port: portFrom {
           ...portFields
         }
       }
       bargeTo: barge(mode: IMPORT) {
         price
         distance
         transitTime
         validTo
         co2
         currency
         port: portTo {
           ...portFields
         }
       }
     }
     
     fragment cityFields on City {
       id
       name
       code
       countryCode
       lat
       lng
     }
     
     fragment portFields on Port {
       id
       name
       code
       countryCode
       lat
       lng
     }
     
     fragment portFeesFields on PortFees {
       abbr
       title
       text
       originalPrice
       originalCurrency
       price
       perLot
       co2
     }
     
                                   `,
        });
        let api_res = yield axios_1.default.post("https://www.searates.com/graphql_rates", data, config);
        console.log(`
   
    {
      shipment: fcl(from: [${from.lat}, ${from.long}],to: [${to.lat}, ${to.long}],${containers_str} , date: "${data_saida}",  currency: USD) {
        shipmentId
        transportationMode
        incoterms
        currency
        cityFrom: city(mode: EXPORT) {
          ...cityFields
        }
        cityTo: city(mode: IMPORT) {
          ...cityFields
        }
        portFrom: port(mode: EXPORT) {
          ...portFields
        }
        portTo: port(mode: IMPORT) {
          ...portFields
        }
        freight: oceanFreight {
          ...ratesFields
        }
      }
      default {
        services
        bookingViaEmail
      }
      identity {
        first_name
        last_name
        admin
        carrier
        dfa
        email
        phone
      }
    }
    
    fragment ratesFields on OceanFreight {
      shippingLine
      logo
      containerCode
      validTo
      containerType
      overdue
      co2
      quantity
      linerTerms
      originalPrice
      originalCurrency
      price
      distance
      comment
      transitTime
      transportFrom
      transportTo
      alternative
      portFeesFrom: portFees(mode: EXPORT) {
        ...portFeesFields
      }
      portFeesTo: portFees(mode: IMPORT) {
        ...portFeesFields
      }
      truckFrom: truck(mode: EXPORT) {
        originalPrice
        originalCurrency
        price
        comment
        distance
        transitTime
        interpolation
        co2
      }
      truckTo: truck(mode: IMPORT) {
        originalPrice
        originalCurrency
        price
        comment
        distance
        transitTime
        interpolation
        co2
      }
      railFrom: rail(mode: EXPORT) {
        originalPrice
        originalCurrency
        price
        distance
        transitTime
        interpolation
        co2
      }
      railTo: rail(mode: IMPORT) {
        originalPrice
        originalCurrency
        price
        distance
        transitTime
        interpolation
        co2
      }
      dryFrom: dry(mode: EXPORT) {
        price
        distance
        transitTime
        interpolation
        city(mode: EXPORT) {
          ...cityFields
        }
      }
      dryTo: dry(mode: IMPORT) {
        price
        distance
        transitTime
        interpolation
        city(mode: IMPORT) {
          ...cityFields
        }
      }
        bargeFrom: barge(mode: EXPORT) {
        price
        distance
        transitTime
        validTo
        currency
        co2
        port: portFrom {
          ...portFields
        }
      }
      bargeTo: barge(mode: IMPORT) {
        price
        distance
        transitTime
        validTo
        co2
        currency
        port: portTo {
          ...portFields
        }
      }
    }
    
    fragment cityFields on City {
      id
      name
      code
      countryCode
      lat
      lng
    }
    
    fragment portFields on Port {
      id
      name
      code
      countryCode
      lat
      lng
    }
    
    fragment portFeesFields on PortFees {
      abbr
      title
      text
      originalPrice
      originalCurrency
      price
      perLot
      co2
    }
    
                                  `);
        api_res.data.data.shipment.forEach((shipment) => {
            let freights = shipment.freight;
            freights.forEach((freight) => {
                let data_partida = (0, utils_1.converteStrToData2)(freight.validTo);
                let tempo_trasito = parseInt(freight.transitTime.split(" ")[0]);
                let data_chegada = new Date(data_partida);
                data_chegada.setDate(data_chegada.getDate() + tempo_trasito);
                response_freight.push({
                    shipment_id: shipment.shipmentId,
                    tipo_container: freight.containerType,
                    id_tipo_container: freight.containerCode,
                    porto_embarque: shipment.portFrom.name,
                    id_porto_embarque: shipment.portFrom.code,
                    porto_descarga: shipment.portTo.name,
                    id_porto_descarga: shipment.portTo.code,
                    armador: freight.shippingLine,
                    id_armador: freight.shippingLine,
                    navio: "",
                    data_embarque: (0, utils_1.formataData)(data_partida),
                    tempo_de_transito: freight.transitTime,
                    data_chegada: (0, utils_1.formataData)(data_chegada),
                    frete: `$ ${parseFloat(freight.price) - 100}`,
                    imagem_link: freight.logo,
                });
            });
        });
        if (response_freight.length === 0) {
            return [];
        }
        else {
            return response_freight;
        }
    }
    catch (e) {
        return [];
    }
});
exports.searates = searates;
