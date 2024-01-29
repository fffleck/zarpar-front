import mongoose from 'mongoose';

// Document interface
export interface ITipoMercadoriaDepara extends mongoose.Document {
    idArmador: string;
    idItem: string;
    name: string;
  }

const TipoMercadoriaDeparaSchema = new mongoose.Schema({
    idArmador:{
        type:String,
        required:true
    },
    idItem:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
});

const TipoMercadoriaDepara = mongoose.model<ITipoMercadoriaDepara>("TipoMercadoriaDepara", TipoMercadoriaDeparaSchema);

export default TipoMercadoriaDepara;