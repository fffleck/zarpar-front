import mongoose from 'mongoose';

// Document interface
export interface IArmador extends mongoose.Document {
    idArmador: string;
    name: string;
  }

const ArmadorSchema = new mongoose.Schema({
    idArmador:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
});

const Armador = mongoose.model<IArmador>("Armador", ArmadorSchema);

export default Armador;