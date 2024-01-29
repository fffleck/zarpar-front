import { IFreteMaritmo } from '../models/FreteMaritmo';
import FreteMaritmo from "../models/FreteMaritmo";

const create = (body: IFreteMaritmo) => FreteMaritmo.create(body);
const getAll = () => FreteMaritmo.find();

export default {
    create,
    getAll
}