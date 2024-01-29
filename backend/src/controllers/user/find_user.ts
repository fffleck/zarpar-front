import {Request, Response} from "express";
import userService from "../../services/user.service";
import { IUser } from "../../models/User";

export const find_user = async (req: Request, res: Response)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const email = req.body.email;

    const user = await userService.getByEmail(email);

    if(user){
        const usuarioLocalizado = user[0];
        res.json({
            success: true,
            message: "Usuário localizado",
            user:usuarioLocalizado
        })
    }
    else{
      res.status(401).json({
        success: false,
        message: "Problema ao localizar usuário."
      })
    }
};