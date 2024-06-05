import React from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Admin = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="admin"/>
      <main>
        <HeaderPage nomeOpcao="Admin"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Painel Administrativo</h2>
            <div style={{textAlign: "center"}}>
              <h4 ><strong>Em breve ! ! ! </strong></h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
