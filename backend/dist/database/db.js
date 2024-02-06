"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDatabase() {
    mongoose_1.default
        .connect(`mongodb+srv://karavel_app:karavelapp2023@cluster0.oem86y1.mongodb.net/karavel?retryWrites=true&w=majority`, (err) => {
        if (err) {
            console.error('FAILED TO CONNECT TO MONGODB');
            console.error(err);
        }
        else {
            console.log('CONNECTED TO MONGODB');
        }
    });
}
exports.default = connectDatabase;
;
