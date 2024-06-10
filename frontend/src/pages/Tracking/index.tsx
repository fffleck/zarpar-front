import React from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Tracing = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="tracking"/>
      <main>
        <HeaderPage nomeOpcao="Tracking"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Tracking</h2>
            <div style={{textAlign: "center"}}>
              <h4 ><strong>Em breve ! ! ! </strong></h4>
            </div>
          </div>
          <div className="main-content-title"  style={{textAlign: "center"}}>
            <img src="/imagens/tracking_2.png" width="900px" height="600px" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tracing;
