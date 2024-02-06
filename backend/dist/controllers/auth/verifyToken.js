"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jwt = require('jsonwebtoken');
const KEY_JWT = 'karavel2023jwt';
const verifyToken = (req, res) => {
    let token = req.headers['authorization'];
    if (token != undefined) {
        //[0] = 'Bearer' e [1] = token
        token = token.split(' ')[1];
        jwt.verify(token, KEY_JWT, (err, decode) => {
            if (!err) {
                res.json({
                    success: true,
                    message: 'Token is valid.'
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    error: err
                });
            }
        });
    }
    else {
        res.status(401).json({
            success: false
        });
    }
};
exports.verifyToken = verifyToken;
