import React from "react";
// import "./styles.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

type ResultadoProps = {
  _id: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  qtdContainers: string;
  tipoContainer: string;
  data_embarque: string;
  armador: string;
  Currency: string;
  targetOceanFreight: string;
  totalRegistros: number;
  totalCotados: number;
  status: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaNac = (props: TabelaResultadosProps) => {
  const email = sessionStorage.getItem("user_email");
    return (
      <Table striped bordered>
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Porto Origem</th>
              <th scope="col">Porto Destino</th>
              <th scope="col">Data Embarque</th>
              <th scope="col">Qtd Containers</th>
              <th scope="col">Tipo Container</th>
              <th scope="col">Moeda</th>
              <th scope="col">Valor</th>
              <th scope="col">Qtd Armadors</th>
              <th scope="col">Qtd Cotados</th>
              <th scope="col">Status</th>
              <th scope="col"> </th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            <tr key={resultado._id}>
              <td>{resultado._id.substring(resultado._id.length - 6 )}</td>
              <td>{resultado.selectPortoEmbarque.split(" - ")[0]}</td>
              <td>{resultado.selectPortoDescarga.split(" - ")[0]}</td>
              <td>{resultado.data_embarque}</td>
              <td>{resultado.qtdContainers}</td>
              <td>{resultado.tipoContainer}</td>
              <td>{resultado.Currency}</td>
              <td>{resultado.targetOceanFreight}</td>            
              <td>{resultado.totalRegistros}</td>
              <td>{resultado.totalCotados}</td>
              <td>{resultado.status}</td>            
              <td>
              {resultado.status !== "Done" ? (  
                <Link to={`/list/nac/${resultado._id}`}>
                  <button className="btn btn-info">View</button>
                </Link>  
              ) : (
                <Link to={`/list/nac/${resultado._id}`}>
                  <button className="btn btn-secondary">View</button>
                </Link>  
              )}
              </td>            
          </tr>
          ))}
        </tbody>
      </Table>
    );
  

};

export default TabelaNac;
