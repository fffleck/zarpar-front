import { ITipoContainer } from '../models/TipoContainer';
import TipoContainer from "../models/TipoContainer";
import { ITipoContainerDepara } from '../models/TipoContainerDepara';
import TipoContainerDepara from "../models/TipoContainerDepara";

const create = (body: ITipoContainer) => TipoContainer.create(body);
const createDepara = (body: ITipoContainerDepara) => TipoContainerDepara.create(body);
const getAll = () => TipoContainer.find();

export default {
    create,
    createDepara,
    getAll
}