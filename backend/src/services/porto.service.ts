import { IPorto } from '../models/Porto';
import Porto from "../models/Porto";
import { IPortoDepara } from '../models/PortoDepara';
import PortoDepara from "../models/PortoDepara";

const create = (body: IPorto) => Porto.create(body);
const createDepara = (body: IPortoDepara) => PortoDepara.create(body);
const getAll = () => Porto.find();

export default {
    create,
    createDepara,
    getAll
}