import React from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import ProgressBar from "react-bootstrap/ProgressBar";
import api from "../../services/api";

const Dashboard = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="dashboard"/>
      <main>
        <HeaderPage nomeOpcao="Dashboard"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Dashboard</h2>
            <div className="dashboard-content">
              <div className="dashboard-flex-parent">
                <div className="dashboard-box">
                  <div className="box-icon box-cotacoes">
                    <i className="fa-solid fa-table-list"></i>
                  </div>
                  <div className="value">12</div>
                  <div className="type">COTAÇÕES</div>
                </div>
                <div className="dashboard-box">
                  <div className="box-icon box-bookings">
                    <i className="fa-solid fa-ship"></i>
                  </div>
                  <div className="value">23</div>
                  <div className="type">BOOKINGS</div>
                </div>
                <div className="dashboard-box">
                  <div className="box-icon box-pagamentos">
                    <i className="fa-solid fa-money-check-dollar"></i>
                  </div>
                  <div className="value">03</div>
                  <div className="type">PAGAMENTOS</div>
                </div>
                <div className="dashboard-box">
                  <div className="box-icon box-alertas">
                    <i className="fa-solid fa-bell"></i>
                  </div>
                  <div className="value">02</div>
                  <div className="type">ALERTAS</div>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-box">
            <p> BOOKINGS CONFIRMADOS </p>
            <ProgressBar variant="success" now={25} label={"Success example"} />
            <p></p>
            <ProgressBar variant="info" now={50} label={"Info example"} />
            <p></p>
            <ProgressBar variant="warning" now={75} label={"Warning example"} />
            <p></p>
            <ProgressBar variant="danger" now={100} label={"Danger example"} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
