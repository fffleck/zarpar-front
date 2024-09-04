import React from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";


type ResultadoProps = {
    id: string;
    armador: string;
    cliente: string;
    data_embarque: string;
    porto_embarque: string;
    porto_descarga: string;
    tipo_mercadoria: string;
    tipo_container: string;
    quantidade_containers: string;
    valor: string;
    status: string;
    email: string;
    bookingFile: string;
    blFile: string;
    oceanFreigth: string;
};

const ResultadoBooking = (props: ResultadoProps) => {

  // const hostBackEnd = "http://localhost:3334";
  const hostBackEnd = "https://zarpar-services-3a7856d27138.herokuapp.com";

  const classButton = (status) => {
    let classReturn = "";
    if (status.toLowerCase() === "pending") { classReturn = "btn btn-warning botao" }
    if (status.toLowerCase() === "canceled") { classReturn = "btn btn-danger botao" }
    if (status.toLowerCase() === "confirmed") { classReturn = "btn btn-success botao" }
    if (status.toLowerCase() === "deleted") { classReturn = "btn btn-danger botao" }
    if (status.toLowerCase() === "loaded") { classReturn = "btn btn-primary botao" }
    if (status.toLowerCase() === "saved") { classReturn = "btn btn-info botao" }

    return classReturn;
  };

  const getArmador = (armador) => {
    let nome = "ND"
    if (armador === "1") { nome = "MAERSK" }
    if (armador === "2") { nome = "CGA_CGM" }
    if (armador === "3") { nome = "MSC" }
    if (armador === "4") { nome = "EXALOG" }
    if (armador === "5") { nome = "COSCO" }
    if (armador === "6") { nome = "HAPAG" }
    if (armador === "7") { nome = "ONE" }
    if (armador === "8") { nome = "HMM" }
    
    return nome
  }

  const getLinkBooking = (fileBooking) => {
    if (fileBooking && fileBooking!== "") {
      return (
        <a target="_blank" href={hostBackEnd+'/'+fileBooking}>
              <i className="fa-solid fa-download"></i>
            </a>
      )
    } else {
      return ( "" )
    }
  }

  const getLinkBlFile = (fileBL) => {
    if (fileBL && fileBL!== "") {
      return (
        <a target="_blank" href={hostBackEnd+'/'+fileBL}>
              <i className="fa-solid fa-download"></i>
            </a>
      )
    } else {
      return ( "" )
    }
  }


  if (props.email==="ffleck@gmail.com" || props.email==="alvaro@karavel.com.br") {
    if (props.status !== "Canceled") {
      return (
        <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.cliente}</td>
          <td>{getArmador(props.armador)}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.data_embarque}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>
            <button className={classButton(props.status)}>{props.status[0].toUpperCase() + props.status.substring(1)}</button>&nbsp;&nbsp; 
          </td>
          <td>{getLinkBooking(props.bookingFile)}</td>
          <td>{getLinkBlFile(props.blFile)}</td>
          <td>
          <Link to={`/edit/${props.id}`}>Edit</Link>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.cliente}</td>
          <td>{getArmador(props.armador)}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.data_embarque}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>
            <button className={classButton(props.status)}>{props.status[0].toUpperCase() + props.status.substring(1)}</button>&nbsp;&nbsp; 
          </td>
          <td>{getLinkBooking(props.bookingFile)}</td>
          <td>{getLinkBlFile(props.blFile)}</td>
          <td></td>
        </tr>
      );
    }
    
  } else {
    return (
      <tr>
        <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{getArmador(props.armador)}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.data_embarque}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>
            <button className={classButton(props.status)}>{props.status[0].toUpperCase() + props.status.substring(1)}</button>&nbsp;&nbsp; 
          </td>
          <td>{getLinkBooking(props.bookingFile)}</td>
          <td>{getLinkBlFile(props.blFile)}</td>
        <td></td>
      </tr>
    );
  }

    
};

export default ResultadoBooking;
