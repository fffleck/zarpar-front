import mongoose from 'mongoose';

// Document interface
export interface ITipoContainer extends mongoose.Document {
    idItem: string;
    name: string;
  }

const TipoContainerSchema = new mongoose.Schema({
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

const TipoContainer = mongoose.model<ITipoContainer>("TipoContainer", TipoContainerSchema);

export default TipoContainer;