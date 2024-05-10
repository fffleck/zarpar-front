import React from "react";
import { Link } from "react-router-dom";


type ResultadoProps = {
    id: string;
    booking: string;
    blnumber: string;
    armador: string;
    navio: string;
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
    if (status === "Pending") { classReturn = "btn btn-warning botao" }
    if (status === "Canceled") { classReturn = "btn btn-danger botao" }
    if (status === "Confirmed") { classReturn = "btn btn-success botao" }
    if (status === "Deleted") { classReturn = "btn btn-danger botao" }
    if (status === "Shipped") { classReturn = "btn btn-primary botao" }
    if (status === "Saved") { classReturn = "btn btn-info botao" }

    return classReturn;
  };


  if (props.email==="ffleck@gmail.com") {
    return (
      <tr key={props.id}>
        <td>{props.id.substring(props.id.length - 6 )}</td>
        <td>{props.email}</td>
        <td>{props.booking}</td>
        <td>{props.blnumber}</td>
        <td>{props.armador}</td>
        <td>{props.navio}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td>
          <button className={classButton(props.status)}>{props.status}</button>&nbsp;&nbsp; 
        </td>
        <td>
        <Link to={`/edit/${props.id}`}>Edit</Link>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{props.id.substring(props.id.length - 10 )}</td>
        <td>{props.booking}</td>
        <td>{props.blnumber}</td>
        <td>{props.armador}</td>
        <td>{props.navio}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td>
          <button className="btn btn-primary botao">{props.status}</button>
          </td>
        <td></td>
      </tr>
    );
  }

    
};

export default ResultadoBooking;
