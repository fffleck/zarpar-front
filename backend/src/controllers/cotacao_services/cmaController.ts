import { Request, Response } from "express";
import portoService from "../../services/porto.service";
import tipoContainerService from "../../services/tipo_container.service";
import axios from "axios";
import { formataData, formataData2, converteStrToData2 } from "../../utils";

export const cmaController = async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  let response_freight: any[];
  response_freight = [];

  response_freight = await cma(req, res);

  if (response_freight.length === 0) {
    res.status(200).json({
      message: "[SEARATES] Frete nao encontrado.",
    });
  } else {
    res.status(200).json(response_freight);
  }
};

export const cma = async (req: Request, res: Response) => {
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
  if (!data_saida || !porto_embarque || !porto_descarga || !tipo_container) {
    return [];
  }

  let response_freight: any[];
  response_freight = [];

  // try {
  let portos = await portoService.getAll();

  let pe_obj = portos.find(
    (porto) => porto.port_id.trim() === porto_embarque.trim()
  );
  let pd_obj = portos.find(
    (porto) => porto.port_id.trim() === porto_descarga.trim()
  );

  let from = { lat: pe_obj?.lat_float, long: pe_obj?.lon_float };
  let to = { lat: pd_obj?.lat_float, long: pd_obj?.lon_float };
  let container;
  let containerAndSize: any;

  // CONTAINER -> PARAMETRO DA API
  // ST: Dry
  // RF: reefer
  // SP: Special

  // containerAndSize -> PARA ACHAR O TIPO DE CONTAINER NA RESPOSTA
  if (tipo_container == "ST20" || tipo_container == "ST40") {
    container = "ST";

    if (tipo_container == "ST20") {
      containerAndSize = "20ST";
    } else if (tipo_container == "ST40") {
      containerAndSize = "40ST";
    }
  }
  if (tipo_container == "HQ40" || tipo_container == "HQ45") {
    container = "ST";

    if (tipo_container == "HQ40") {
      containerAndSize = "40HC";
    } else if (tipo_container == "HQ45") {
      containerAndSize = "45HC";
    }
  }
  if (tipo_container == "REF20" || tipo_container == "REF40") {
    container = "RF";

    if (tipo_container == "REF20") {
      containerAndSize = "20RF";
    } else if (tipo_container == "REF40") {
      containerAndSize = "40RF";
    }
  }

  const config = {
    headers: {
      KeyId: "m9sWjkTzHA0CDYEf5wjw5u1aOwBpcvjU",
    },
  };

  // Frete
  let frete_api = await axios.get(
    `https://apis.cma-cgm.net/pricing/commercial/quotation/v2/publicQuotelines/search?portOfLoading=${pe_obj?.port_code}&portOfDischarge=${pd_obj?.port_code}&departureDate=${data_saida}&equipmentType=${container}`,
    config
  );

  // Routings
  let routings_api = await axios.get(
    `https://apis.cma-cgm.net/vesseloperation/route/v2/routings?placeOfLoading=${pe_obj?.port_code}&placeOfDischarge=${pd_obj?.port_code}&departureDate=${data_saida}&equipmentType=${container}`,
    config
  );

  const frete_api_data = frete_api.data;
  const routings_api_data = routings_api.data;

  //console.log(frete_api_data[0].surcharges.matchingSurchargesPerEquipment);

  let surcharges;
  surcharges = frete_api_data[0].surcharges.matchingSurchargesPerEquipment.find(
    (equipment: any) => {
      console.log(containerAndSize);
      console.log(equipment.equipmentSizeType);
      return equipment.equipmentSizeType === containerAndSize;
    }
  );

  if (!surcharges || surcharges.length == 0) {
    throw "Tipo de container não encontrado.";
  }

  let chargeFRT00;
  let chargeBAF03;
  chargeFRT00 = surcharges.matchingCargoSurcharges.find((charge: any) => {
    // console.log(charge);
    return charge.charge.chargeCode === "FRT00";
  });
  chargeBAF03 = surcharges.matchingCargoSurcharges.find((charge: any) => {
    return charge.charge.chargeCode === "BAF03";
  });

  // console.log(chargeFRT00);
  let frete = chargeFRT00.amount + chargeBAF03.amount; //FRETE
  // console.log(frete);

  routings_api_data.forEach((routing: any) => {
    console.log("\nROUTING:");

    let transitTime = routing.transitTime;
    let voyageReference =
      routing.routingDetails[0].transportation.vehicule.reference;
    let vessel = routing.routingDetails[0].transportation.vehicule.vehiculeName;
    let dataPartida: any;
    let dataChegada: any;

    let routingPartida: any;
    let routingChegada: any;
    routing.routingDetails.forEach((routingDetail: any) => {
      // Inciando valores
      if (!dataPartida) {
        routingPartida = routingDetail;
        routingChegada = routingDetail;
        dataPartida = new Date(routingDetail.pointFrom.departureDateGmt);
        dataChegada = new Date(routingDetail.pointTo.arrivalDateGmt);
      }

      let tempDataPartida = new Date(routingDetail.pointFrom.departureDateGmt);
      let tempDataChegada = new Date(routingDetail.pointTo.arrivalDateGmt);

      if (dataPartida < tempDataPartida) {
        dataPartida = tempDataPartida;
        routingPartida = routingDetail;
      }

      if (dataChegada > tempDataChegada) {
        dataChegada = tempDataChegada;
        routingChegada = routingDetail;
      }
    });

    console.log(routingChegada);
    console.log(routingPartida);
    console.log(dataChegada);
    console.log(dataPartida);

    response_freight.push({
      shipment_id: voyageReference,
      tipo_container: tipo_container,
      id_tipo_container: tipo_container,
      porto_embarque: pe_obj?.port_name,
      id_porto_embarque: pe_obj?.port_code,
      porto_descarga: pd_obj?.port_name,
      id_porto_descarga: pd_obj?.port_code,
      armador: "CMA CGM",
      id_armador: "CMA CGM",
      navio: vessel,
      data_embarque: formataData(dataPartida),
      tempo_de_transito: `${transitTime} days`,
      data_chegada: formataData(dataChegada),
      frete: `$ ${parseFloat(frete)}`,
      imagem_link: "http://www.cma-cgm.com/Images/2018/logo/logo-cmacgm.svg",
    });
  });

  // // SEARATES
  // frete_api.data.forEach((shipment: any) => {
  //   let freights = shipment.freight;
  //   freights.forEach((freight: any) => {
  //     let data_partida = converteStrToData2(freight.validTo);
  //     let tempo_trasito = parseInt(freight.transitTime.split(" ")[0]);
  //     let data_chegada = new Date(data_partida);
  //     data_chegada.setDate(data_chegada.getDate() + tempo_trasito);

  //     response_freight.push({
  //       shipment_id: shipment.shipmentId,
  //       tipo_container: freight.containerType,
  //       id_tipo_container: freight.containerCode,
  //       porto_embarque: shipment.portFrom.name,
  //       id_porto_embarque: shipment.portFrom.code,
  //       porto_descarga: shipment.portTo.name,
  //       id_porto_descarga: shipment.portTo.code,
  //       armador: freight.shippingLine,
  //       id_armador: freight.shippingLine,
  //       navio: "",
  //       data_embarque: formataData(data_partida),
  //       tempo_de_transito: freight.transitTime,
  //       data_chegada: formataData(data_chegada),
  //       frete: `$ ${parseFloat(freight.price) - 100}`,
  //       imagem_link: freight.logo,
  //     });
  //   });
  // });

  if (response_freight.length === 0) {
    return [];
  } else {
    return response_freight;
  }
  // } catch (e) {
  //   return [];
  // }
};
