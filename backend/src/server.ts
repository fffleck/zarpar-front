import express from "express";
import bodyParser from "body-parser";
var cors = require('cors')
import axios from "axios";
const app = express();
const jsonParser = bodyParser.json();
import connectDatabase from "./database/db";

// Iniciando base de dados
connectDatabase();

// Importando serviços do DB
import armadorService from "./services/armador.service";
import freteMaritmoService from "./services/frete_maritmo.service";
import mercadoriaService from "./services/mercadoria.service";
import portoService from "./services/porto.service";
import tipoContainerService from "./services/tipo_container.service";
import tipoMercadoriaService from "./services/tipo_mercadoria.service";

app.use(cors())

app.get("/api/busca-fretes", async (req, res)=>{
   const { armador, data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container, tipo_mercadoria } = req.query
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

   if( !armador || !data_saida|| !porto_embarque|| !porto_descarga|| !mercadoria|| !tipo_container|| !tipo_mercadoria ){
      res.send([]);
   }else{
      
      let results: Array<any> = [];
      if(armador === "0"){
         //consulta todos os armadores e retorna todos
         results = results.concat(await maersk(req))
      }else{
         // MAERSK
         if(armador === "1"){
            results = results.concat(await maersk(req))
         }
      }
   }
})

app.get("/api/test", async (req, res)=>{
   console.log(req.query)
   const { data_saida, porto_embarque, porto_descarga, mercadoria, tipo_container }: any = req.query;
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
   if( !data_saida|| !porto_embarque|| !porto_descarga|| !mercadoria|| !tipo_container){
      res.status(200).json({
         message: "Preencha todos os filtros para prosseguir"
      });
   }else{
      let response = await freteMaritmoService.getAll();
      res.status(200).json(response.filter(frete => converteStrToData2(data_saida) <= converteStrToData1(frete.data_embarque) && frete.id_mercadoria === mercadoria && frete.id_tipo_container === tipo_container && frete.id_porto_descarga === porto_descarga && frete.id_porto_embarque === porto_embarque));
   }
});



// BUSCA ARMADORES
async function maersk (req: any){
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

app.get("/api/mercadorias", async (req, res)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
   console.log(req.query);
   let response = await mercadoriaService.getAll();
   res.status(200).json(response);
})

app.get("/api/portos_embarque", async (req, res)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
   console.log(req.query);
   let response = await portoService.getAll();
   res.status(200).json(response.filter((porto)=> porto.incluiEmbarque));
})

app.get("/api/portos_descarga", async (req, res)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
   console.log(req.query);
   let response = await portoService.getAll();
   res.status(200).json(response.filter((porto)=> porto.incluiChegada));

})

app.get("/api/tipos_container", async (req, res)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
   console.log(req.query);
   let response = await tipoContainerService.getAll();
   res.status(200).json(response);
   
})

app.get("/api/tipos_mercadoria", async (req, res)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
   console.log(req.query);
   let response = await tipoMercadoriaService.getAll();
   res.status(200).json(response);
})

function converteStrToData1(dataStr: string){
   let [dayStr, monthStr, yearStr] = dataStr.split("/")
   if(dayStr[0] ==="0"){
      dayStr = dayStr.replace("0", "")
   }
   if(monthStr[0] ==="0"){
      monthStr = monthStr.replace("0", "")
   }

   let day = parseInt(dayStr);
   let month = parseInt(monthStr) - 1;
   let year = parseInt(yearStr);

   return new Date(year, month, day);

}

function converteStrToData2(dataStr: string){
   let [yearStr, monthStr, dayStr] = dataStr.split("-")
   if(dayStr[0] ==="0"){
      dayStr = dayStr.replace("0", "")
   }
   if(monthStr[0] ==="0"){
      monthStr = monthStr.replace("0", "")
   }

   let day = parseInt(dayStr);
   let month = parseInt(monthStr) - 1;
   let year = parseInt(yearStr);

   return new Date(year, month, day);
}

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
   console.log(`Server is listing on port ${PORT}`);
 });
server.on('error', e => console.error("Error", e));