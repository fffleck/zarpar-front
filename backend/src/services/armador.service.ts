import { IArmador } from '../models/Armador';
import Armador from "../models/Armador";

const create = (body: IArmador) => Armador.create(body);

export default {
    create,
}