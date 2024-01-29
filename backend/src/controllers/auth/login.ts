import {Request, Response} from "express";
import userService from "../../services/user.service";
import { IUser } from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const KEY_JWT='karavel2023jwt';

export const login =  async (req: Request, res: Response)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
 
    const { email, password } = req.body.userData;
 
    const passwordHash = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
 
    if(email === undefined || password === undefined){
       res.status(401).json({
          success: false,
          message: "Ocorreu um problema ao logar.",
       })
    }else{
       const user = await userService.getByEmail(email); 
 
       //Usuário encontrado e validado
       if(user.length > 0 && user[0].password === passwordHash){
          const usuarioEncontrado = user[0];
          const tokenData = {nome: usuarioEncontrado.name, email: usuarioEncontrado.email}
          const generatedToken = jwt.sign(tokenData, KEY_JWT, {expiresIn: '240m'});
 
          res.json(
             {
                success: true,
                token: generatedToken,
                email: email,
             }
          )
       }
       else{
          res.status(401).json({
             success: false,
             message: "e-mail e/ou senhas inválidos."
          })
       }
    }
 };
