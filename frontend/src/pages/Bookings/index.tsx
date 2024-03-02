import React, { useState } from "react";
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import "./styles.css";
import api from '../../services/api';
import TabelaResultados from "./Tabela/tabela";

interface ResponseItem {
  id: string;
  armador: string;
  data_embarque: string;
  embarcador_name: string;
  porto_embarque: string;
  porto_descarga: string;
  tipo_mercadoria: string;
  tipo_container: string;
  quantidade_containers: string;
  valor: string;
}

const Bookings = () => {
  const email = sessionStorage.getItem("user_email");
  const [response, setResponse] = useState<ResponseItem[]>([]);

  api.post('/booking/list_booking', {email})
  .then(resp => {
    setResponse(resp.data.list);
  })

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="bookings"/>
      <main>
        <HeaderPage nomeOpcao="Bookings"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Bookings</h2>
            <p></p>
           <TabelaResultados response={response} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;
