import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo+white.png";

const Sidebar = (props) => {
  const active = {
    dashboard: "",
    cotacoes: "",
    bookings: "",
    pagamentos: "",
    conta: "",
  };

  active[props.elementoAtivo] = "active";

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <img src={logo} alt="Logo Karavel" />
      </div>
      <div className="menu">
        <ul>
          <li className={active.dashboard}>
            <i className="fa-solid fa-house"></i>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li className={active.cotacoes}>
            <i className="fa-solid fa-table-list"></i>
            <Link to="/cotacoes">Cotações</Link>
            {/* <a href="cotacoes.html">Cotações</a> */}
          </li>

          {/*
            <li className={active.bookings}>
              <i className="fa-solid fa-ship"></i>
              <Link to="/bookings">Bookings</Link>
            </li>
            <li className={active.pagamentos}>
              <i className="fa-solid fa-money-check-dollar"></i>
              <Link to="/pagamentos">Pagamentos</Link>
            </li>
            */}
          <li className={active.conta}>
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
