import mongoose from 'mongoose';

// Document interface
export interface IFreteMaritmo extends mongoose.Document {
    mercadoria: string;
    id_mercadoria: string;
    tipo_mercadoria: string;
    id_tipo_mercadoria: string;
    tipo_container: string;
    id_tipo_container: string;
    porto_embarque: string;
    id_porto_embarque: string;
    porto_descarga: string;
    id_porto_descarga: string;
    armador: string;
    id_armador: string;
    nome_navio: string;
    data_embarque: string;
    tempo_de_transito: string;
    data_chegada: string;
    frete: string;
    transbordo:string;
  }

const FreteMaritmoSchema = new mongoose.Schema({
    mercadoria: {
        type:String,
        required:true
    },
    id_mercadoria: {
        type:String,
        required:true
    },
    tipo_mercadoria: {
        type:String,
        required:true
    },
    id_tipo_mercadoria: {
        type:String,
        required:true
    },
    tipo_container: {
        type:String,
        required:true
    },
    id_tipo_container: {
        type:String,
        required:true
    },
    porto_embarque: {
        type:String,
        required:true
    },
    id_porto_embarque: {
        type:String,
        required:true
    },
    porto_descarga: {
        type:String,
        required:true
    },
    id_porto_descarga: {
        type:String,
        required:true
    },
    armador: {
        type:String,
        required:true
    },
    id_armador: {
        type:String,
        required:true
    },
    nome_navio: {
        type:String,
        required:true
    },
    data_embarque: {
        type:String,
        required:true
    },
    tempo_de_transito: {
        type:String,
        required:true
    },
    data_chegada: {
        type:String,
        required:true
    },
    frete: {
        type:String,
        required:true
    },
    transbordo:{
        type:String,
        required:true
    },
});

const FreteMaritmo = mongoose.model<IFreteMaritmo>("FreteMaritmo", FreteMaritmoSchema);

export default FreteMaritmo;