import React from "react";

type ResultadoProps = {
    id: string;
    armador: string;
    data_embarque: string;
    porto_embarque: string;
    porto_descarga: string;
    tipo_mercadoria: string;
    tipo_container: string;
    quantidade_containers: string;
    valor: string;
};

const ResultadoBooking = (props: ResultadoProps) => {

    return (
      <tr key={props.id}>
        <td>{props.id}</td>
        <td>{props.armador}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td>{props.tipo_mercadoria}</td>
        <td>{props.quantidade_containers}</td>
        <td>{props.tipo_container.replace("Standard", "ST").replace("High Cube", "HQ")}</td>
        <td>{props.valor}</td>
      </tr>
    );
};

export default ResultadoBooking;
