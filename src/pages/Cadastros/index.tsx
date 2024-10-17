import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import api from '../../services/api';
import TabelaResultadosFretes from "./Fretes/tabela";
import TabelaResultadosTaxas from "./Taxas/tabela";
import TabelaResultadosPortos from "./Portos/tabela";
import TabelaResultadosContainers from "./Containers/tabela";


interface ResponseItemTaxes {
  id: string;
  direcao: string;
  armador: string;
  porto: string;
  container: string;
  taxname: string;
  currency: string;
  taxValue: string;
  applicability: string;
}

interface ResponseItemFreight {
  id: string;
  mercadoria: string;
  tipo_mercadoria: string;
  tipo_container: string;
  porto_embarque: string;
  porto_descarga: string;
  armador: string;
  nome_navio: string;
  data_embarque: Date;
  tempo_de_transito: string;
  data_chegada: Date;
  base_freight: string;
  bunker: string;
  isps: string;
  transbordo: string;
}

interface ResponsePortos {
  port_name: string;
  port_code: string;
  country: string;
  lat: string;
  lon: string;
  lat_float: Float32List;
  lon_float: Float32List;
  port_id: string;
}

interface ResponseContainers {
  idItem: string;
  name: string;
  weight: string;
}

const Cadastros = () => {
  const email = sessionStorage.getItem("user_email");
  const [listTaxes, setListTaxes] = useState<ResponseItemTaxes[]>([]);
  const [listFreight, setListFreight] = useState<ResponseItemFreight[]>([]);
  const [listPortos, setListPortos] = useState<ResponsePortos[]>([]);
  const [listContainers, setListContainers] = useState<ResponseContainers[]>([]);
  const [activeTab, setActiveTab] = useState("fretes"); // Gerenciar abas

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('fretes/list');
        setListFreight(res.data.list);

        const list = await api.get('taxes/list');
        setListTaxes(list.data.list);

        const respCont = await api.get('containers/list');
        setListContainers(respCont.data.list);

        const respPortos = await api.get('portos/list');
        setListPortos(respPortos.data.list);
        
      } catch (error) {
        console.error('Error fetching quotations data:', error);
      }
    };

    fetchData();
  }, [email]);

  // Alternar entre abas
  const renderContent = () => {
    switch (activeTab) {
      case "fretes":
       return <TabelaResultadosFretes response={listFreight} />;
      case "taxas":
        return <TabelaResultadosTaxas response={listTaxes} />;
      case "portos":
        return <TabelaResultadosPortos response={listPortos} />;
      case "containers":
        return <TabelaResultadosContainers response={listContainers} />;
      default:
        return <TabelaResultadosFretes response={listFreight} />;
    }
  };

  return (
    <div className="flex-dashboard" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar elementoAtivo="cadastros" />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderPage nomeOpcao="Admin" />
        <div className="main-content" style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div className="main-content-title">
          <h2>Painel Administrativo</h2>
        </div>
          <div className="card" style={{ flex: 1, padding: '20px', width: '99%', overflow: 'auto' }}>
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs justify-content-start">
                <li className="nav-item">
                  <a 
                    className="nav-link"
                    onClick={() => setActiveTab("fretes")}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: activeTab === "fretes" ? 'blue' : 'gray',
                      color: 'white'
                    }}>
                      Fretes
                  </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <a 
                    className="nav-link"
                    onClick={() => setActiveTab("taxas")}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: activeTab === "taxas" ? 'blue' : 'gray',
                      color: 'white'
                    }}>
                      Taxas
                  </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <a 
                    className="nav-link"
                    onClick={() => setActiveTab("portos")}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: activeTab === "portos" ? 'blue' : 'gray',
                      color: 'white'
                    }}>
                      Portos
                  </a>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <a 
                    className="nav-link"
                    onClick={() => setActiveTab("containers")}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: activeTab === "containers" ? 'blue' : 'gray',
                      color: 'white'
                    }}>
                      Containers
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

export default Cadastros;
