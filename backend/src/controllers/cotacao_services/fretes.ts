import { Request, Response } from "express";
import { zim } from "./zimController"
import { searates } from "./searatesController";
import { evergreen } from "./evergreenController";

export const fretes = async (req: Request, res: Response) => {
  const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container }: any = req.query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  let response_freight: any[]
  response_freight = []

  response_freight = await adicionar_servico(response_freight, req, res, searates)
  response_freight = await adicionar_servico(response_freight, req, res, zim)
  response_freight = await adicionar_servico(response_freight, req, res, evergreen)

  if(response_freight.length === 0){
    console.log({
      message: "[COTAÇÕES] Fretes nao encontrado."
   })
    res.status(200).json([]);

  }else{
    res.status(200).json(response_freight);
  }

} 

const adicionar_servico = async (arr: any[], req: Request, res: Response, service: (req: Request, res: Response) => Promise<any[]>) => {
    try{
        let res_service: any[];
        res_service = await service(req, res);
        res_service = res_service.concat(arr);
        return res_service;

    }catch(e){
        return arr;
    }
}