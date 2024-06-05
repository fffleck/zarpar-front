import React from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Pagamentos = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="pagamentos"/>
      <main>
        <HeaderPage nomeOpcao="Pagamentos"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Pagamentos</h2>
            <div style={{textAlign: "center"}}>
              <h4 ><strong>Em breve ! ! ! </strong></h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pagamentos;
