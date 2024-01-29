import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import connectDatabase from "./database/db";
var CryptoJS = require("crypto-js");
var cors = require("cors");
var jwt = require("jsonwebtoken");
const jsonParser = bodyParser.json();
const app = express();

const KEY_JWT = "karavel2023jwt";

// Iniciando base de dados
connectDatabase();

// Importando serviços do DB
import armadorService from "./services/armador.service";
import freteMaritmoService from "./services/frete_maritmo.service";
import mercadoriaService from "./services/mercadoria.service";
import portoService from "./services/porto.service";
import tipoContainerService from "./services/tipo_container.service";
import tipoMercadoriaService from "./services/tipo_mercadoria.service";
import userService from "./services/user.service";
import { IUser } from "./models/User";

app.use(express.json());
app.use(cors());

app.get("/busca-fretes", async (req, res) => {
  const {
    armador,
    data_saida,
    porto_embarque,
    porto_descarga,
    mercadoria,
    tipo_container,
    tipo_mercadoria,
  } = req.query;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (
    !armador ||
    !data_saida ||
    !porto_embarque ||
    !porto_descarga ||
    !mercadoria ||
    !tipo_container ||
    !tipo_mercadoria
  ) {
    res.send([]);
  } else {
    let results: Array<any> = [];
    if (armador === "0") {
      //consulta todos os armadores e retorna todos
      results = results.concat(await maersk(req));
    } else {
      // MAERSK
      if (armador === "1") {
        results = results.concat(await maersk(req));
      }
    }
  }
});

app.get("/test", async (req, res) => {
  console.log(req.query);
  const {
    data_saida,
    porto_embarque,
    porto_descarga,
    mercadoria,
    tipo_container,
  }: any = req.query;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (
    !data_saida ||
    !porto_embarque ||
    !porto_descarga ||
    !mercadoria ||
    !tipo_container
  ) {
    res.status(200).json({
      message: "Preencha todos os filtros para prosseguir",
    });
  } else {
    let response = await freteMaritmoService.getAll();
    res
      .status(200)
      .json(
        response.filter(
          (frete) =>
            converteStrToData2(data_saida) <=
              converteStrToData1(frete.data_embarque) &&
            frete.id_mercadoria === mercadoria &&
            frete.id_tipo_container === tipo_container &&
            frete.id_porto_descarga === porto_descarga &&
            frete.id_porto_embarque === porto_embarque
        )
      );
  }
});

// BUSCA ARMADORES
async function maersk(req: any) {
  // let query: Query = {
  //    porto_embarque: req.query.porto_embarque + "",
  //    porto_descarga: req.query.porto_descarga + "",
  //    mercadoria: req.query.mercadoria + "",
  //    tipo_container: req.query.tipo_container + ""
  // }
  // const dataReq: QueryDePara = getDeParaFiltros(query);

  // let url: string = `http://localhost:3000/maersk?data_saida=${req.query.data_saida}&porto_embarque=${dataReq.porto_embarque.maersk}&porto_descarga=${dataReq.porto_descarga.maersk}&mercadoria=${dataReq.mercadoria.maersk}&tipo_container=${dataReq.tipo_container.maersk}`
  // let response = await axios.get(url);
  // if(response.status === 200){
  //    return response.data;
  // }else{
  //    return [];
  // }
  return [];
}

app.get("/mercadorias", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let response = await mercadoriaService.getAll();
  res.status(200).json(response);
});

app.get("/portos_embarque", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let response = await portoService.getAll();
  // res.status(200).json(response.filter((porto)=> porto.incluiEmbarque));
  res.status(200).json(response);
});

app.get("/portos_descarga", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let response = await portoService.getAll();
  res.status(200).json(response);
  // res.status(200).json(response.filter((porto)=> porto.incluiChegada));
});

app.get("/tipos_container", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let response = await tipoContainerService.getAll();
  res.status(200).json(response);
});

app.get("/tipos_mercadoria", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let response = await tipoMercadoriaService.getAll();
  res.status(200).json(response);
});

app.get("/searatesapi", async (req, res) => {
  const {
    data_saida,
    porto_embarque,
    porto_descarga,
    mercadoria,
    tipo_container,
  }: any = req.query;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (
    !data_saida ||
    !porto_embarque ||
    !porto_descarga ||
    !mercadoria ||
    !tipo_container
  ) {
    res.status(200).json({
      message: "Preencha todos os filtros para prosseguir",
    });
  }

  let response_freight: any[];
  response_freight = [];

  try {
    let portos = await portoService.getAll();

    let pe_obj = portos.find(
      (porto) => porto.port_id.trim() === porto_embarque.trim()
    );
    let pd_obj = portos.find(
      (porto) => porto.port_id.trim() === porto_descarga.trim()
    );

    let from = { lat: pe_obj?.lat_float, long: pe_obj?.lon_float };
    let to = { lat: pd_obj?.lat_float, long: pd_obj?.lon_float };
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
    let token = (
      await axios.get(
        `https://www.searates.com/auth/platform-token?id=${platform_id}`
      )
    ).data["s-token"];
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    //

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

    let api_res = await axios.post(
      "https://www.searates.com/graphql_rates",
      data,
      config
    );

    api_res.data.data.shipment.forEach((shipment: any) => {
      let freights = shipment.freight;
      freights.forEach((freight: any) => {
        let data_partida = converteStrToData2(freight.validTo);
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
          data_embarque: formataData(data_partida),
          tempo_de_transito: freight.transitTime,
          data_chegada: formataData(data_chegada),
          frete: `$ ${parseFloat(freight.price) - 100}`,
          imagem_link: freight.logo,
        });
      });
    });

    // ZIM
    // Tratar data
    let data_saida_zim = formataData2(new Date(data_saida));

    try {
      // let api_zim_res = await axios.get(`http://localhost:3334/zim?data_saida=${data_saida_zim}&porto_embarque=${porto_embarque}&porto_descarga=${porto_descarga}&tipo_container=${tipo_container}`)
      let api_zim_res = await axios.get(
        `https://karavel-services-e63c55605b2e.herokuapp.com/zim?data_saida=${data_saida_zim}&porto_embarque=${porto_embarque}&porto_descarga=${porto_descarga}&tipo_container=${tipo_container}`
      );
      api_zim_res.data.forEach((result: any) => {
        response_freight.push(result);
      });
    } catch (e) {
      console.log("Zim não trouxe resultados.");
    }
    if (response_freight.length === 0) {
      res.status(200).json({
        message: "Frete nao encontrado.",
      });
    } else {
      res.status(200).json(response_freight);
    }
  } catch (e) {
    res.status(200).json({
      message: "Erro ao consultar API da Searates.",
    });
  }
});

app.post("/register", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const newUser = req.body.userData;
  newUser.password = CryptoJS.MD5(newUser.password).toString(CryptoJS.enc.Hex); //Converte a senha para MD5

  userService
    .create(newUser)
    .then((id) => {
      return res.status(200).json({
        success: true,
        errorCode: 0,
        message: "Usuário cadastrado com sucesso.",
      });
    })
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        // Duplicate e-mail
        return res
          .status(422)
          .send({
            succes: false,
            errorCode: err.code,
            message: "E-mail já cadastrado!",
          });
      } else {
        return res
          .status(500)
          .json({
            success: false,
            errorCode: err.code,
            message: "Problema ao cadastrar usuário",
          });
      }
    });
});

app.post("/login", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const { email, password } = req.body.userData;

  const passwordHash = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);

  if (email === undefined || password === undefined) {
    res.status(401).json({
      success: false,
      message: "Ocorreu um problema ao logar.",
    });
  } else {
    const user = await userService.getByEmail(email);

    //Usuário encontrado e validado
    if (user.length > 0 && user[0].password === passwordHash) {
      const usuarioEncontrado = user[0];
      const tokenData = {
        nome: usuarioEncontrado.name,
        email: usuarioEncontrado.email,
      };
      const generatedToken = jwt.sign(tokenData, KEY_JWT, {
        expiresIn: "240m",
      });

      res.json({
        success: true,
        token: generatedToken,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "e-mail e/ou senhas inválidos.",
      });
    }
  }
});

app.get("/verifytoken", (req, res) => {
  let token = req.headers["authorization"];

  if (token != undefined) {
    //[0] = 'Bearer' e [1] = token
    token = token.split(" ")[1];

    jwt.verify(token, KEY_JWT, (err: any, decode: any) => {
      if (!err) {
        res.json({
          success: true,
          message: "Token is valid.",
        });
      } else {
        res.status(401).json({
          success: false,
          error: err,
        });
      }
    });
  } else {
    res.status(401).json({
      success: false,
    });
  }
});

function converteStrToData1(dataStr: string) {
  let [dayStr, monthStr, yearStr] = dataStr.split("/");
  if (dayStr[0] === "0") {
    dayStr = dayStr.replace("0", "");
  }
  if (monthStr[0] === "0") {
    monthStr = monthStr.replace("0", "");
  }

  let day = parseInt(dayStr);
  let month = parseInt(monthStr) - 1;
  let year = parseInt(yearStr);

  return new Date(year, month, day);
}

function formataData(data: Date) {
  function adicionaZero(numero: any) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }
  let dataFormatada =
    adicionaZero(data.getDate().toString()) +
    "/" +
    adicionaZero(data.getMonth() + 1).toString() +
    "/" +
    data.getFullYear();
  return dataFormatada;
}

function formataData2(data: Date) {
  function adicionaZero(numero: any) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }
  let dataFormatada =
    data.getFullYear() +
    "-" +
    adicionaZero(data.getMonth() + 1).toString() +
    "-" +
    adicionaZero(data.getDate().toString());
  return dataFormatada;
}

function converteStrToData2(dataStr: string) {
  let [yearStr, monthStr, dayStr] = dataStr.split("-");
  if (dayStr[0] === "0") {
    dayStr = dayStr.replace("0", "");
  }
  if (monthStr[0] === "0") {
    monthStr = monthStr.replace("0", "");
  }

  let day = parseInt(dayStr);
  let month = parseInt(monthStr) - 1;
  let year = parseInt(yearStr);

  return new Date(year, month, day);
}

const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3333; //DEV

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
server.on("error", (e) => console.error("Error", e));
