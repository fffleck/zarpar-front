import React from "react";
import Table from "react-bootstrap/Table";
import ResultadoQuotationNAC from "./resultados";

type ResultadoProps = {
  id: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  qtdContainers: string;
  tipoContainer: string;
  data_embarque: string;
  armador: string;
  embarcador_email: string;
  embarcador_nome: string;
  
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultadosNAC = (props: TabelaResultadosProps) => {
    return (
      <Table striped bordered>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Armador</th>
              <th scope="col">Cliente</th>
              <th scope="col">Shipper</th>
              <th scope="col">Consignee</th>
              <th scope="col">POL</th>
              <th scope="col">POD</th>
              <th scope="col">Product</th>
              <th scope="col">Qtd Container</th>
              <th scope="col">Type Container</th>
              <th scope="col">ETS</th>
              
              <th scope="col">  </th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            <ResultadoQuotationNAC
              id={resultado._id}
              cliente={resultado.embarcador_email}
              shipper={resultado.shipper}
              consignee={resultado.consignee}
              porto_embarque={resultado.selectPortoEmbarque.split(' - ')[1]}
              porto_descarga={resultado.selectPortoDescarga.split(' - ')[1]}
              mercadoria={resultado.selectMercadoria.split(' - ')[1].replaceAll('-','')}
              quantidade_containers={resultado.qtdContainers}
              tipo_container={resultado.tipoContainer}
              data_embarque={resultado.data_embarque}
              armador={resultado.armador}
            />
          ))}
        </tbody>
      </Table>
    );
 

};

export default TabelaResultadosNAC;
