import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import "./styles.css";
import api from '../../services/api';
import TabelaResultados from "./Tabela/tabela";

interface ResponseItem {
  id: string;
  armador: string;
  data_embarque: string;
  embarcador_email: string;
  embarcador_name: string;
  porto_embarque: string;
  porto_descarga: string;
  selectMercadoria: string;
  tipo_container: string;
  quantidade_containers: string;
  valor: string;
  status: string;
  email: string;
}

const Bookings = () => {
  const email = sessionStorage.getItem("user_email");
  const [response, setResponse] = useState<ResponseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.post('/booking/list_booking', {email});
        const resposta = resp.data.list;
        setResponse(resposta);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, [email]); // Executa apenas uma vez, após o componente ser montado

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="bookings"/>
      <main>
        <HeaderPage nomeOpcao="Bookings"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Bookings</h2>
            <p></p>
            <TabelaResultados response={response}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;
