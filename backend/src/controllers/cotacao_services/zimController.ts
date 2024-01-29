import { Request, Response } from "express";
import portoService from "../../services/porto.service";
import tipoContainerService from "../../services/tipo_container.service";
import axios from "axios";
import { formataData, formataData2, converteStrToData2 } from "../../utils";

export const zimController = async (req: Request, res: Response) => {
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

  let response_freight: any[];
  response_freight = [];

  response_freight = await zim(req, res);

  if (response_freight.length === 0) {
    res.status(200).json({
      message: "Frete nao encontrado.",
    });
  } else {
    res.status(200).json(response_freight);
  }
};

export const zim = async (req: Request, res: Response) => {
  const {
    data_saida,
    porto_embarque,
    porto_descarga,
    mercadoria,
    tipo_container,
  }: any = req.query;
  if (!data_saida || !porto_embarque || !porto_descarga || !tipo_container) {
    return [];
  }

  let response_freight: any[];
  response_freight = [];

  try {
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
      return [];
    } else {
      return response_freight;
    }
  } catch (e) {
    // Tratar erro
    console.log(e);

    return [];
  }
};
