import React from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Impulsionar = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="impulsionar"/>
      <main>
        <HeaderPage nomeOpcao="Impulsionar"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Impulsionar</h2>
            <div style={{textAlign: "center"}}>
              <h4 ><strong>Em breve ! ! ! </strong></h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Impulsionar;
