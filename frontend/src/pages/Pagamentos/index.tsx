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
            <div className="table">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Pedido</th>
                    <th scope="col">Booking</th>
                    <th scope="col">Navio</th>
                    <th scope="col">D/L Draft</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>68451385</td>
                    <td>Cap San Antonio 222R</td>
                    <td>Pago</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>68451385</td>
                    <td>Cap San Antonio 222R</td>
                    <td>Pago</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>68451385</td>
                    <td>Cap San Antonio 222R</td>
                    <td>Pago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pagamentos;
