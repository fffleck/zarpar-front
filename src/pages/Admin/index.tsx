import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import TabelaResultadosNAC from "./NAC/Tabela/tabela"; // Exemplo de segunda tabela
import api from '../../services/api';
import TabelaResultClientes from "./Client/tabela";

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

interface ResponseClient {
  id: string;
  name: string;
  enterpriseName: string;
  email: string;
  countLogin: string;
  lastLogin: Date;
  search: string;
  active: string;
}

const Admin = () => {
  const email = sessionStorage.getItem("user_email");
  const [response, setResponse] = useState<ResponseItem[]>([]);
  const [listClient, setListClient] = useState<ResponseClient[]>([]);
  const [activeTab, setActiveTab] = useState("nac"); // Gerenciar abas

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('quotations/list');
        setResponse(res.data.list);
        const list = await api.post('user/analitics', { email });
        setListClient(list.data.list);
      } catch (error) {
        console.error('Error fetching quotations data:', error);
      }
    };

    fetchData();
  }, [email]);

  // Alternar entre abas
  const renderContent = () => {
    switch (activeTab) {
      case "nac":
        return <TabelaResultadosNAC response={response} />;
      case "cliente":
        return <TabelaResultClientes response={listClient} />;
      default:
        return <TabelaResultadosNAC response={response} />;
    }
  };

  return (
    <div className="flex-dashboard" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar elementoAtivo="admin" />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderPage nomeOpcao="Admin" />
        <div className="main-content" style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div className="main-content-title">
          <h2>Painel Administrativo</h2>
        </div>
          <div className="card" style={{ flex: 1, padding: '20px', width: '90%', overflow: 'auto' }}>
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs justify-content-start">
                <li className="nav-item">
                  <a 
                    className="nav-link"
                    onClick={() => setActiveTab("nac")}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: activeTab === "nac" ? 'blue' : 'gray',
                      color: 'white'
                    }}>
                      Cotações
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link"
                    onClick={() => setActiveTab("cliente")}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: activeTab === "cliente" ? 'blue' : 'gray',
                      color: 'white'
                    }}>
                      Clientes
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {renderContent()} {/* Alternar o conteúdo */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
