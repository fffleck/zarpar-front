import React from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Demandas = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="demandas"/>
      <main>
        <HeaderPage nomeOpcao="Demandas"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Demandas</h2>
            <div style={{textAlign: "center"}}>
              <h4 ><strong>Em breve ! ! ! </strong></h4>
            </div>
          </div>
          <div className="main-content-title"  style={{textAlign: "center"}}>
            <img src="/imagens/trade.png" width="900px" height="600px" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demandas;
