import { IUser } from '../models/User';
import User from "../models/User";

const create = (body: IUser) => User.create(body);
const getByEmail = (emailRequerido: string) => User.find({email: emailRequerido});

export default {
    create,
    getByEmail
}