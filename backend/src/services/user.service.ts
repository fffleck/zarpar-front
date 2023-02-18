import { IUser } from '../models/User';
import User from "../models/User";

const create = (body: IUser) => User.create(body);

export default {
    create
}