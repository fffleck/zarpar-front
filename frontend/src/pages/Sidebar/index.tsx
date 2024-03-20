import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo+white.png";

const Sidebar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto ou fechado
  const active = {
    dashboard: "",
    cotacoes: "",
    bookings: "",
    pagamentos: "",
    upload: "",
    conta: "",
  };

  const email = sessionStorage.getItem("user_email");

  active[props.elementoAtivo] = "active";

  return (
    <div className={`sidebar ${menuOpen ? "open" : ""}`}>
      <div className="sidebar-title">
        <img src={logo} alt="Logo Karavel" />
        <i className="fa-solid fa-bars" onClick={() => setMenuOpen(!menuOpen)}></i>
      </div>
      <div className="menu">
        {/* Botão para abrir/fechar o menu */}
        <button className="toggle-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? "fa-chevron-left" : "fa-chevron-right"}`}></i>
        </button>
        {/* Links do menu */}
        <ul>
          <li className={active.dashboard}>
            <i className="fa-solid fa-house"></i>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={active.cotacoes}>
            <i className="fa-solid fa-table-list"></i>
            <Link to="/cotacoes">Cotações</Link>
          </li>
          <li className={active.bookings}>
            <i className="fa-solid fa-ship"></i>
            <Link to="/bookings">Bookings</Link>
          </li>
          {/* Renderiza o link de Upload apenas se o menu estiver aberto e o email for válido */}
          {(email === "ffleck@gmail.com" || email === "alvaro@karavel.com.br") && (
            <li className={active.upload}>
              <i className="fa-solid fa-upload"></i>
              <Link to="/upload">Upload</Link>
            </li>
          )}
          <li className={active.conta}>
            <i className="fa-solid fa-circle-user"></i>
            <Link to="/conta">Conta</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
