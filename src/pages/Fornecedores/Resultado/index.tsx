import React from "react";
import { Link } from "react-router-dom";


type ResultadoProps = {
    id: string;
    armador: string;
    name: string;
    email: string;
    phone:string;
    tradelane: string;
};

const ResultadoFornecedor = (props: ResultadoProps) => {
  if (props.email==="ffleck@gmail.com" || props.email==="alvaro@karavel.com.br") {
      return (
        <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.armador}</td>
          <td>{props.name}</td>
          <td>{props.email}</td>
          <td>{props.phone}</td>
          <td>{props.tradelane}</td>
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
        </tr>
    );
  }

    
};

export default ResultadoFornecedor;
