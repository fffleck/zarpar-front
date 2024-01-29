import mongoose from 'mongoose';

// Document interface
export interface IPortoDepara extends mongoose.Document {
    idArmador: string;
    idItem: string;
    name: string;
  }

const PortoDeparaSchema = new mongoose.Schema({
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

const PortoDepara = mongoose.model<IPortoDepara>("PortoDepara", PortoDeparaSchema);

export default PortoDepara;