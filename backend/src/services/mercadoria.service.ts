import { IMercadoria } from '../models/Mercadoria';
import Mercadoria from "../models/Mercadoria";
import { IMercadoriaDepara } from '../models/MarcadoriaDepara';
import MercadoriaDepara from "../models/MarcadoriaDepara";

const create = (body: IMercadoria) => Mercadoria.create(body);
const createDepara = (body: IMercadoriaDepara) => MercadoriaDepara.create(body);
const getAll = () => Mercadoria.find();

export default {
    create,
    createDepara,
    getAll
}