import mongoose from 'mongoose';

// Document interface
export interface IPorto extends mongoose.Document {
    port_id: string,
    port_name: string,
    port_code: string,
    country: string,
    lat: string,
    lon: string,
    lat_float: number,
    lon_float: number
  }

const PortoSchema = new mongoose.Schema({
    port_id:{
        type:String,
        required:true,
        unique:true
    },
    port_name:{
        type:String,
        required:true,
        
    },
    port_code:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lon:{
        type:String,
        required:true
    },
    lat_float:{
        type:Number,
        required:true
    },
    lon_float:{
        type:Number,
        required:true
    },
});

const Porto = mongoose.model<IPorto>("Porto", PortoSchema);

export default Porto;