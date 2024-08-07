import React from "react";
import Table from "react-bootstrap/Table";
import ResultadoFornecedor from "../Resultado";

type ResultadoProps = {
  id: string;
  idArmador: string;
  name: string;
  email: string;
  phone: string;
  tradelane: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const returnArmador = (idArmador) => {
  let armadorName = "";
  if (idArmador === "1") { armadorName = "MAERSK" }
  if (idArmador === "2") { armadorName = "CMA-CGM" }
  if (idArmador === "3") { armadorName = "MSC" }
  if (idArmador === "4") { armadorName = "EXALOG" }
  if (idArmador === "5") { armadorName = "COSCO" }
  if (idArmador === "6") { armadorName = "HAPAG" }
  if (idArmador === "7") { armadorName = "ONE" }
  if (idArmador === "8") { armadorName = "HMM" }

  return armadorName;
};

const mappingTradelane = (tradelane) => {
  const arrTrades = tradelane.split(",") 
  let arrResult = [];
  if (arrTrades.length > 0) {
    arrTrades.forEach((trade) => {
      if (trade === "global") { arrResult.push("Global   ")}
      if(trade === "TPEastbound") { arrResult.push("Trans-Pacific (Eastbound)   ")}
      if(trade === "TPWestbound") { arrResult.push("Trans-Pacific (Westbound)   ")}
      if(trade === "AEWestbound") { arrResult.push("Asia-Europe (Westbound)   ")}
      if(trade === "EAEastbound") { arrResult.push("Europe-Asia (Eastbound)   ")}
      if(trade === "Asia") { arrResult.push("Asia-Asia   ")}
      if(trade === "TAEurope") { arrResult.push("Trans-Atlantic (Europe)   ")}
      if(trade === "TAUS") { arrResult.push("Trans-Atlantic (US)   ")}
      if(trade === "FALA") { arrResult.push("From Asia to Latin America   ")}
      if(trade === "FLAA") { arrResult.push("From Latin America to Asia   ")}
      if(trade === "FELA") { arrResult.push("From Europe to Latin America   ")}
      if(trade === "FLAE") { arrResult.push("From Latin America to Europe   ")}
      if(trade === "FNALA") { arrResult.push("From North America to Latin America   ")}
      if(trade === "FLANA") { arrResult.push("From Latin America to North America   ")}
      if(trade === "LA") { arrResult.push("Latin America – Latin America    ")}
    })
  }

  return arrResult
}


const TabelaResultadosFornecedores = (props: TabelaResultadosProps) => {
  const email = sessionStorage.getItem("user_email");
  if (email==='ffleck@gmail.com' || email==='alvaro@karavel.com') {
    return (
      <Table striped bordered>
          <thead>
            <tr>
              <th scope="col">#Order</th>
              <th scope="col">Armador</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Fone</th>
              <th scope="col">Tradelane</th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            <ResultadoFornecedor
              id={resultado._id}
              armador={returnArmador(resultado.idArmador)}
              name={resultado.name}
              email={resultado.email}
              phone={resultado.phone}
              tradelane={mappingTradelane(resultado.tradelane)}
            />
          ))}
        </tbody>
      </Table>
    );
  } else {
    return (
      <Table striped bordered>
          <thead>
          <tr>
              <th scope="col">#Order</th>
              <th scope="col">Armador</th>
              <th scope="col">Nome</th>
              <th scope="col">Fone</th>
              <th scope="col">Tradelane</th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            <ResultadoFornecedor
            id={resultado._id}
            armador={resultado.armador}
            email={resultado.email}
            nome={resultado.nome}
            phone={resultado.phone}
            tradelane={resultado.tradelane}
          />
          ))}
        </tbody>
      </Table>
    );
  }

};

export default TabelaResultadosFornecedores;
