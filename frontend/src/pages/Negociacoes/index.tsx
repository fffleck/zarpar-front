import React from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Negociacoes = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="negociacoes"/>
      <main>
        <HeaderPage nomeOpcao="Negociacoes"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Negociações</h2>
            <div style={{textAlign: "center"}}>
              <h4 ><strong>Em breve ! ! ! </strong></h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Negociacoes;
