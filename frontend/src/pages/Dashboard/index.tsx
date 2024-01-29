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
        <div className="container dashboard">
      <div className="row gap-3 mt-3">
        <div
          className="card border-light col-xl-4 col-lg-12 col-md-12 card-profile"
          style={{"padding": 0}}
        >
          <div
            className="card-img-top" 
            style={{"backgroundColor": "cadetblue"}}
          >
            <h5 className="card-title m-3 mb-4" style={{"color": "white"}}>Bem Vindo!</h5>
          </div>
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg"
            alt=""
            style={{
              "width": "50px",
              "height": "50px",
              "position": "absolute",
              "top": "50px",
              "left": "25px",
              "borderRadius": "8px",
              "objectFit": "contain",
            }}
          />
          <div className="card-body row m-1 mt-4">
            <h5 className="col-9 card-subtitle" style={{"padding": 0}}>Alvaro Nunes</h5>
            <button className="col-3 btn btn-primary btn-sm">
              Conta <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
        {/* <!-- CARD --> */}
        <div
          className="card border-light col-xl-2 col-lg-3 col-md-4 col-sm-12 card-dash"
        >
          <div className="card-body">
            <div className="top-card-dash fs-4 row column-gap-2">
              <h6 className="col-8 card-title pd-0">Cotações Solicitadas</h6>
              <i className="col-2 bi bi-map pd-0"></i>
            </div>
            <h1 className="card-data text-center">80</h1>
            <a href="#">Solicitar Cotação <i className="bi bi-arrow-right"></i></a>
          </div>
        </div>
        {/* <!-- CARD -->
        <!-- CARD --> */}
        <div
          className="card border-light col-xl-2 col-lg-3 col-md-4 col-sm-12 card-dash"
        >
          <div className="card-body">
            <div className="top-card-dash fs-4 row column-gap-2">
              <h6 className="col-8 card-title pd-0">Cotações Solicitadas</h6>
              <i className="col-2 bi bi-map pd-0"></i>
            </div>
            <h1 className="card-data text-center">80</h1>
            <a href="#">Solicitar Cotação <i className="bi bi-arrow-right"></i></a>
          </div>
        </div>
        {/* <!-- CARD -->
        <!-- CARD --> */}
        <div
          className="card border-light col-xl-2 col-lg-3 col-md-4 col-sm-12 card-dash"
        >
          <div className="card-body">
            <div className="top-card-dash fs-4 row column-gap-2">
              <h6 className="col-8 card-title pd-0">Cotações Solicitadas</h6>
              <i className="col-2 bi bi-map pd-0"></i>
            </div>
            <h1 className="card-data text-center">80</h1>
            <a href="#">Solicitar Cotação <i className="bi bi-arrow-right"></i></a>
          </div>
        </div>
        {/* <!-- CARD --> */}
      </div>
      <div className="row"></div>
    </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
