import React from "react";
// import "./styles.css";
import Table from "react-bootstrap/Table";
import ResultadoBooking from "../Resultado";

type ResultadoProps = {
  id: string;
  booking: string;
  booking_id: string;
  bl_number: string;
  armador: string;
  navio: string;
  data_embarque: string;
  embarcador_email: string;
  porto_embarque: string;
  porto_descarga: string;
  selectMercadoria: string;
  tipo_container: string;
  quantidade_containers: string;
  valor: string;
  status: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultados = (props: TabelaResultadosProps) => {
  const email = sessionStorage.getItem("user_email");
  if (email==='ffleck@gmail.com' || email==='alvaro@karavel.com') {
    return (
      <Table striped bordered>
          <thead>
            <tr>
              <th scope="col">#Order</th>
              <th scope="col">Client</th>
              <th scope="col">#Booking</th>
              <th scope="col">#B/L</th>
              <th scope="col">Armador</th>
              <th scope="col">Navio</th>
              <th scope="col">ETS</th>
              <th scope="col">POL</th>
              <th scope="col">POD</th>
              <th scope="col">Status</th>
              <th scope="col"> # </th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            <ResultadoBooking
              id={resultado._id}
              booking={resultado.bl_number}
              blnumber={resultado.booking_id}
              armador={resultado.armador}
              navio={resultado.navio}
              data_embarque={resultado.data_embarque}
              porto_embarque={resultado.porto_embarque}
              porto_descarga={resultado.porto_descarga}
              status={resultado.status}
              email={email}
              client={resultado.embarcador_email}
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
              <th scope="col">#Booking</th>
              <th scope="col">#B/L</th>
              <th scope="col">Armador</th>
              <th scope="col">Navio</th>
              <th scope="col">ETS</th>
              <th scope="col">POL</th>
              <th scope="col">POD</th>
              <th scope="col">Status</th>
              <th scope="col"> # </th>
            </tr>
          </thead>
        <tbody>
          {props.response.map((resultado) => (
            <ResultadoBooking
              id={resultado._id}
              booking=""
              blnumber=""
              armador={resultado.armador}
              navio={resultado.navio}
              data_embarque={resultado.data_embarque}
              porto_embarque={resultado.porto_embarque}
              porto_descarga={resultado.porto_descarga}
              status={resultado.status}
              email={email}
            />
          ))}
        </tbody>
      </Table>
    );
  }

};

export default TabelaResultados;
