"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3333; //DEV
const server = app_1.default.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
server.on("error", (e) => console.error("Error", e));
server.timeout = 60 * 2 * 1000;
