import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";


type ResultadoProps = {
    id: string;
    armador: string;
    name: string;
    email: string;
    phone:string;
    tradelane: string;
};

const ResultadoFornecedor = (props: ResultadoProps) => {
  const navigate = useNavigate();

  const sendBookingReserva = async (event) => {
    event.preventDefault();
      try {
        await api.post('/fornecedor/del', props);
        alert("Fornecedor apagado com sucesso !");
        routeChange();
      } catch (error) {
        alert("Ocorreu um problema ao apagar o fornecedor:");
      }
  }

  const routeChange = () => { 
    navigate("/nac");
  };

  if (props.email==="ffleck@gmail.com" || props.email==="alvaro@karavel.com.br") {
      return (
        <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.armador}</td>
          <td>{props.name}</td>
          <td>{props.email}</td>
          <td>{props.phone}</td>
          <td>{props.tradelane}</td>
          <td><form onSubmit={sendBookingReserva}><button type="submit" className="btn btn-danger"> Apagar </button></form></td>
        </tr>
      );
  } else {
    return (
      <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.armador}</td>
          <td>{props.email}</td>
          <td>{props.phone}</td>
          <td>{props.tradelane}</td>
          <td><form onSubmit={sendBookingReserva}><button type="submit" className="btn btn-danger"> Apagar </button></form></td>
        </tr>
    );
  }

    
};

export default ResultadoFornecedor;
