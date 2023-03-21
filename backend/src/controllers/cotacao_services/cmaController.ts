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
  if (
    !data_saida ||
    !porto_embarque ||
    !porto_descarga ||
    !mercadoria ||
    !tipo_container
  ) {
    return [];
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
    let container;

    // ST: Dry
    // RF: reefer
    // SP: Special

    if (tipo_container == "ST20" || tipo_container == "ST40") {
      container = "ST";
    }
    if (tipo_container == "HQ40" || tipo_container == "HQ45") {
      container = "RF";
    }
    if (tipo_container == "REF20" || tipo_container == "REF40") {
      container = "SP";
    }

    const config = {
      headers: {
        KeyId: "m9sWjkTzHA0CDYEf5wjw5u1aOwBpcvjU",
      },
    };

    // Departure Date
    let api_res = await axios.get(
      `https://apis.cma-cgm.net/pricing/commercial/quotation/v2/publicQuotelines/search?portOfLoading=${pe_obj?.port_code}&portOfDischarge=${pd_obj?.port_code}&departureDate=${data_saida}&equipmentType=${container}`,
      config
    );

    response_freight = api_res.data;

    // api_res.data.data.shipment.forEach((shipment: any) => {
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
  } catch (e) {
    return [];
  }
};
