import mongoose from 'mongoose';

// Document interface
export interface IPorto extends mongoose.Document {
    idItem: string;
    name: string;
    incluiEmbarque: boolean;
    incluiChegada: boolean;
  }

const PortoSchema = new mongoose.Schema({
    idItem:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    incluiEmbarque:{
        type:Boolean,
        required:true
    },
    incluiChegada:{
        type:Boolean,
        required:true
    },
});

const Porto = mongoose.model<IPorto>("Porto", PortoSchema);

export default Porto;