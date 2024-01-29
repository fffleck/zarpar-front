import {Request, Response} from "express";
import userService from "../../services/user.service";
import { IUser } from "../../models/User";
var CryptoJS = require("crypto-js");

export const register = async (req: Request, res: Response)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
 
    const newUser = req.body.userData;
    newUser.password = CryptoJS.MD5(newUser.password).toString(CryptoJS.enc.Hex); //Converte a senha para MD5
    
    userService.create(newUser)
       .then((id) =>{
          return res.status(200).json({
             success: true,
             errorCode: 0,
             message: "Usuário cadastrado com sucesso."})
       })
       .catch(err => {
          if (err.name === 'MongoServerError' && err.code === 11000) {
             // Duplicate e-mail
             return res.status(422).send(
                { succes: false, errorCode: err.code, message: 'E-mail já cadastrado!'}
             );
          }else{
             return res.status(500).json(
                { success: false, errorCode: err.code, message: "Problema ao cadastrar usuário"}
             );
          }
          
       })
 
 };