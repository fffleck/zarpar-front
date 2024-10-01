import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";


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
    created_at: string;
};

const ResultadoBooking = (props: ResultadoProps) => {

  console.log("DADOS", props)

  // const hostBackEnd = "http://localhost:3334";
  const hostBackEnd = "http://18.222.233.16:3000";

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


  const getLinkBooking = (fileBooking) => {
    if (fileBooking && fileBooking!== "") {
      return (
        <a target="_blank" rel="noreferrer" href={hostBackEnd+'/'+fileBooking}>
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
        <a target="_blank" rel="noreferrer" href={hostBackEnd+'/'+fileBL}>
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
          <td>{props?.id?.substring(props.id.length - 6 )}</td>
          <td>{props.cliente}</td>
          <td>{props.armador}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.data_embarque}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>{moment(props.created_at).format('DD/MM/YYYY')}</td>
          <td>USD</td>
          <td> - </td>
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
          <td>{props?.id?.substring(props.id.length - 6 )}</td>
          <td>{props.cliente}</td>
          <td>{props.armador}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.data_embarque}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>{moment(props.created_at).format('DD/MM/YYYY')}</td>
          <td>USD</td>
          <td> - </td>
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
        <td>{props?.id?.substring(props.id.length - 6 )}</td>
          <td>{props.armador}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.data_embarque}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>{moment(props.created_at).format('DD/MM/YYYY')}</td>
          <td>USD</td>
          <td> - </td>
          <td>
            <button className={classButton(props.status)}>{props.status[0].toUpperCase() + props.status.substring(1)}</button>&nbsp;&nbsp; 
          </td>
          <td>{getLinkBooking(props.bookingFile)}</td>
          <td>{getLinkBlFile(props.blFile)}</td>
          <td><Link to={`/showBooking/${props.id}`}>Show</Link></td>
      </tr>
    );
  }

    
};

export default ResultadoBooking;
