import mongoose from 'mongoose';

// Document interface
export interface IMercadoriaDepara extends mongoose.Document {
    idArmador: string;
    idItem: string;
    name: string;
  }

const MercadoriaDeparaSchema = new mongoose.Schema({
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

const MercadoriaDepara = mongoose.model<IMercadoriaDepara>("MercadoriaDepara", MercadoriaDeparaSchema);

export default MercadoriaDepara;