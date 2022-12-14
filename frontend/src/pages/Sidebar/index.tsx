import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo+white.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <img src={logo} alt="Logo Karavel" />
      </div>
      <div className="menu">
        <ul>
          <li>
            <i className="fa-solid fa-house"></i>
            <Link to="/dashboard">Dashboard</Link>
            {/* <a href="dashboard.html"> Dashboard</a> */}
          </li>
          <li>
            <i className="fa-solid fa-table-list"></i>
            <Link to="/cotacoes">Cotações</Link>
            {/* <a href="cotacoes.html">Cotações</a> */}
          </li>
          <li className="selected">
            <i className="fa-solid fa-ship"></i>
            <Link to="/bookings">Bookings</Link>
            {/* <a href="bookings.html">Bookings</a> */}
          </li>
          <li>
            <i className="fa-solid fa-money-check-dollar"></i>
            <Link to="/pagamentos">Pagamentos</Link>
            {/* <a href="pagamentos.html">Pagamentos</a> */}
          </li>
          <li>
            <i className="fa-solid fa-circle-user"></i>
            <Link to="/conta">Conta</Link>
            {/* <a href="conta.html">Conta</a> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
