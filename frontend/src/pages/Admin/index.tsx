import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import TabelaResultadosNAC from "./NAC/Tabela/tabela";
import api from '../../services/api';

interface ResponseItem {
  id: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  quantidade_containers: string;
  tipo_container: string;
  data_embarque: string;
  armador: string;
  embarcador_email: string;
  embarcador_nome: string;
}


const Admin = () => {
  const email = sessionStorage.getItem("user_email");
  const [response, setResponse] = useState<ResponseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get('quotations/list').then((res) => {
          setResponse(res.data.list);
        });
      } catch (error) {
        console.error('Error fetching quotations data:', error);
      }
    };

    fetchData();
  }, [email]); //

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="admin"/>
      <main>
        <HeaderPage nomeOpcao="Admin"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Painel Administrativo</h2>
            <div className="main-content">
              <h2><strong>Cotações NAC</strong></h2>
              <TabelaResultadosNAC response={response}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
