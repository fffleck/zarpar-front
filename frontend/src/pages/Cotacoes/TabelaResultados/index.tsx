import React from "react";
// import "./styles.css";
import Table from "react-bootstrap/Table";
import Resultado from "../Resultado";

type ResultadoProps = {
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
  imagem_link: string;
  shipment_id: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultados = (props: TabelaResultadosProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Armador</th>
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
            armador={resultado.armador}
            navio={resultado.navio}
            porto_embarque={resultado.porto_embarque}
            data_embarque={resultado.data_embarque}
            tempo_de_transito={resultado.tempo_de_transito}
            porto_descarga={resultado.porto_descarga}
            data_chegada={resultado.data_chegada}
            tipo_container={resultado.tipo_container}
            frete={resultado.frete}
            imagem_link={resultado.imagem_link}
            shipment_id={resultado.shipment_id}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaResultados;
