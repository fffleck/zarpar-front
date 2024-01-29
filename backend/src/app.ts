import express, { Application } from "express";
import connectDatabase from "./database/db";
var cors = require('cors')
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

//Importando routes
import authRouter from "./routes/authRouter"
import cotacaoRouter from "./routes/cotacaoRouter"
import filtersRouter from "./routes/filtersRouter"
import userRouter from "./routes/userRouter"
import emailRouter from "./routes/emailRouter"

class App{
    server: Application
    constructor(){
        this.server = express();

        connectDatabase();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes(){
        // this.server.use(routes);
        this.server.use("/auth", authRouter);
        this.server.use("/cotacao", cotacaoRouter);
        this.server.use("/filters", filtersRouter);
        this.server.use("/user", userRouter);
        this.server.use("/email", emailRouter);
    }

}

export default new App().server;
