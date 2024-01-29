import mongoose from 'mongoose';

// Document interface
export interface ITipoMercadoria extends mongoose.Document {
    idItem: string;
    name: string;
  }

const TipoMercadoriaSchema = new mongoose.Schema({
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

const TipoMercadoria = mongoose.model<ITipoMercadoria>("TipoMercadoria", TipoMercadoriaSchema);

export default TipoMercadoria;