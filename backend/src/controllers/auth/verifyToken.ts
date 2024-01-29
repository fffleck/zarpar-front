import {Request, Response} from "express";
var jwt = require('jsonwebtoken');
const KEY_JWT='karavel2023jwt'

export const verifyToken = (req: Request, res: Response)=>{
 
    let token = req.headers['authorization'];
 
    if(token != undefined){
       //[0] = 'Bearer' e [1] = token
       token = token.split(' ')[1];
 
       jwt.verify(token, KEY_JWT, (err: any, decode: any) => {
          if(!err){
             res.json({
                success: true,
                message: 'Token is valid.'
             })
          }else{
             res.status(401).json({
                success: false,
                error: err 
             })
          }
       });
    }else{
       res.status(401).json({
          success: false
       })
    }
 };