import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


type ResultadoProps = {
    id: string;
    cliente: string;
    shipper: string;
    consignee: string;
    porto_embarque: string;
    porto_descarga: string;
    mercadoria: string;
    quantidade_containers: string;
    tipo_container: string;
    data_embarque: string;
    armador: string;
    status: string;
};

const ResultadoQuotationNAC = (props: ResultadoProps) => {
      return (
        <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.armador}</td>
          <td>{props.cliente}</td>
          <td>{props.shipper}</td>
          <td>{props.consignee}</td>
          <td>{props.porto_embarque}</td>
          <td>{props.porto_descarga}</td>
          <td>{props.mercadoria}</td>
          <td>{props.quantidade_containers}</td>
          <td>{props.tipo_container}</td>
          <td>{props.data_embarque}</td>
          <td>
          {(props.status == "Selected" || props.status == "Discarted" ) ? (
            " - "
          ) : (
            (props.status == "Quoted") ? (
              <Button className="btn btn-sucess botao" > Cotado </Button>
            ) : (
              <Link to={`/consolida/${props.id}`} className="btn btn-info botao" > Cotar </Link>
            )
          )
          }
          
          
          </td>
        </tr>
      );
    
    
  

    
};

export default ResultadoQuotationNAC;
