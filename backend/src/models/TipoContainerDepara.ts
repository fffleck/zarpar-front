import mongoose from 'mongoose';

// Document interface
export interface ITipoContainerDepara extends mongoose.Document {
    idArmador: string;
    idItem: string;
    name: string;
  }

const TipoContainerDeparaSchema = new mongoose.Schema({
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

const TipoContainerDepara = mongoose.model<ITipoContainerDepara>("TipoContainerDepara", TipoContainerDeparaSchema);

export default TipoContainerDepara;