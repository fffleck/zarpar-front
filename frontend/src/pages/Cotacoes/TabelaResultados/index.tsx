import React from "react";
// import "./styles.css";
import Table from "react-bootstrap/Table";
import Resultado from "../Resultado";

type ResultadoProps = {
  mercadoria: string;
  id_mercadoria: string;
  tipo_mercadoria: string;
  id_tipo_mercadoria: string;
  tipo_container: string;
  id_tipo_container: string;
  porto_embarque: string;
  id_porto_embarque: string;
  porto_descarga: string;
  id_porto_descarga: string;
  armador: string;
  id_armador: string;
  navio: string;
  data_embarque: string;
  tempo_de_transito: string;
  data_chegada: string;
  frete: string;
  transbordo: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultados = (props: TabelaResultadosProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">Armadores</th>
          <th scope="col">Navio</th>
          <th scope="col">ETS</th>
          <th scope="col">POL</th>
          <th scope="col">POD</th>
          <th scope="col">Valor</th>
          <th scope="col">T/T</th>
          <th scope="col">ETA/POD</th>
        </tr>
      </thead>
      <tbody>
        {props.response.map((resultado) => (
          <Resultado
            id_armador={resultado.id_armador}
            navio={resultado.navio}
            porto_embarque={resultado.porto_embarque}
            data_embarque={resultado.data_embarque}
            tempo_de_transito={resultado.tempo_de_transito}
            porto_descarga={resultado.porto_descarga}
            data_chegada={resultado.data_chegada}
            mercadoria={resultado.mercadoria}
            tipo_container={resultado.tipo_container}
            frete={resultado.frete}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaResultados;
