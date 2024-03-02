import React from "react";
// import "./styles.css";
import Table from "react-bootstrap/Table";
import ResultadoBooking from "../Resultado";

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

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultados = (props: TabelaResultadosProps) => {
  return (
    <div className="table">
    <Table striped bordered>
      <thead>
        <tr>
          <th scope="col">Booking ID</th>
          <th scope="col">Armador</th>
          <th scope="col">Data Embarque</th>
          <th scope="col">Porto Embarque</th>
          <th scope="col">Porto Descargo</th>
          <th scope="col">Mercadoria</th>
          <th scope="col">Qt. Containers</th>
          <th scope="col">Tipo Container</th>
          <th scope="col">Valor Booking</th>
        </tr>
      </thead>
      <tbody>
        {props.response.map((resultado) => (
          <ResultadoBooking
            id={resultado._id}
            armador={resultado.armador}
            data_embarque={resultado.data_embarque}
            porto_embarque={resultado.porto_embarque}
            porto_descarga={resultado.porto_descarga}
            tipo_mercadoria={resultado.tipo_mercadoria}
            quantidade_containers={resultado.quantidade_containers}
            tipo_container={resultado.tipo_container}
            valor={resultado.valor}
          />
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default TabelaResultados;
