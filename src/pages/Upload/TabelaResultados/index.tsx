import React from "react";
// import "./styles.css";
import Table from "react-bootstrap/Table";

type ResultadoProps = {
    response: {
        arquivo: string;
        total_registros: number;
        total_importados: number;
    }
};

  const TabelaResultados = (props: ResultadoProps) => {
    return (
      <Table striped bordered hover>
        <thead>
            <tr>
                <td colspan="4" className="info"><h1>Arquivo Importado com sucesso ! ! !</h1></td></tr>
        </thead>
    
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Armador</th>
            <th scope="col">Total de Registros</th>
            <th scope="col">Total Importados </th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td> - </td>
            <td>{props.response.arquivo}</td>
            <td>{props.response.total_registros}</td>
            <td>{props.response.total_importados}</td>
        </tr>
        </tbody>
      </Table>
    );
  };
  
export default TabelaResultados;