import React from "react";
import { Link } from "react-router-dom";


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
};

const ResultadoBooking = (props: ResultadoProps) => {

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
        <td></td>
      </tr>
    );
  }

    
};

export default ResultadoBooking;
