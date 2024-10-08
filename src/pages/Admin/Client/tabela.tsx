import React from "react";
import Table from "react-bootstrap/Table";
import ResultadoListClients from "./resultados";

type ResultadoProps = {
  _id: string;
  name: string;
  enterpriseName: string;
  email: string;
  countLogin: string;
  lastLogin: Date;
  search: string;
  active: string;
  
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultClientes = (props: TabelaResultadosProps) => {
    return (
      <Table striped bordered>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Empresa</th>
              <th scope="col">Email</th>
              <th scope="col">Logins</th>
              <th scope="col">Last Login</th>
              <th scope="col">Quotatios</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            
                <ResultadoListClients
                  id={resultado._id}
                  name={resultado.name}
                  enterpriseName={resultado.enterpriseName}
                  email={resultado.email}
                  countLogin={resultado.countLogin}
                  lastLogin={resultado.lastLogin}
                  search={resultado.search}
                  active={resultado.active}
                />
            
          ))}
        </tbody>
      </Table>
    );
 

};

export default TabelaResultClientes;
