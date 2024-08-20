import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import api from '../../services/api';
import TabelaResultadosFornecedores from "./Tabela/tabela";
import { Link, useNavigate } from "react-router-dom";

interface ResponseItem {
  armador: string;
  nome: string;
  email: string;
  phone: string;
  tradelane: string;
}


const Fornecedores = () => {
  const email = sessionStorage.getItem("user_email");
  const [response, setResponse] = useState<ResponseItem[]>([]);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.post('/fornecedor/list', {email});
        const resposta = resp.data.list;
        setResponse(resposta);
      } catch (error) {
        console.error('Error fetching fornecedor data:', error);
      }
    };

    fetchData();
  }, [email]); // Executa apenas uma vez, após o componente ser montado

  const AddFornecedor = async (event) => {
    event.preventDefault();
    navigate("/addFornecedor");
  }

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cotacoes_nac"/>
      <main>
        <HeaderPage nomeOpcao="Fornecedores"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Fornecedor</h2>
            <form className="row g-3 formulario" onSubmit={AddFornecedor}>
              <button type="submit" className="fornecedores">+ Fornecedor</button>
            </form>
            <p></p>
            <TabelaResultadosFornecedores response={response}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Fornecedores;

