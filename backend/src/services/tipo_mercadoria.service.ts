import { ITipoMercadoria } from '../models/TipoMercadoria';
import TipoMercadoria from "../models/TipoMercadoria";
import { ITipoMercadoriaDepara } from '../models/TipoMercadoriaDepara';
import TipoMercadoriaDepara from "../models/TipoMercadoriaDepara";

const create = (body: ITipoMercadoria) => TipoMercadoria.create(body);
const createDepara = (body: ITipoMercadoriaDepara) => TipoMercadoriaDepara.create(body);
const getAll = () => TipoMercadoria.find();

export default {
    create,
    createDepara,
    getAll
}