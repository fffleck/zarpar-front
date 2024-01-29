import mongoose from 'mongoose';

// Document interface
export interface IMercadoria extends mongoose.Document {
    idItem: string;
    name: string;
  }

const MercadoriaSchema = new mongoose.Schema({
    idItem:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
});

const Mercadoria = mongoose.model<IMercadoria>("Mercadoria", MercadoriaSchema);

export default Mercadoria;