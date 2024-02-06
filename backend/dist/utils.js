"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converteStrToData2 = exports.formataData2 = exports.formataData = void 0;
function formataData(data) {
    function adicionaZero(numero) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }
    let dataFormatada = (adicionaZero(data.getDate().toString()) + "/" + (adicionaZero(data.getMonth() + 1).toString()) + "/" + data.getFullYear());
    return dataFormatada;
}
exports.formataData = formataData;
function formataData2(data) {
    function adicionaZero(numero) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }
    let dataFormatada = (data.getFullYear() + "-" + (adicionaZero(data.getMonth() + 1).toString()) + "-" + adicionaZero(data.getDate().toString()));
    return dataFormatada;
}
exports.formataData2 = formataData2;
function converteStrToData2(dataStr) {
    let [yearStr, monthStr, dayStr] = dataStr.split("-");
    if (dayStr[0] === "0") {
        dayStr = dayStr.replace("0", "");
    }
    if (monthStr[0] === "0") {
        monthStr = monthStr.replace("0", "");
    }
    let day = parseInt(dayStr);
    let month = parseInt(monthStr) - 1;
    let year = parseInt(yearStr);
    return new Date(year, month, day);
}
exports.converteStrToData2 = converteStrToData2;
