import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo+white.png";

const Sidebar = (props) => {
  const [menuOpen] = useState(false); // Estado para controlar se o menu está aberto ou fechado
  const active = {
    armadors: "",
    dashboard: "",
    admin: "",
    cadastros: "",
    cotacoes: "",
    cotacoes_nac: "",
    bookings: "",
    tracking: "",
    pagamentos: "",
    demandas: "",
    negociacoes: "",
    impulsionar: "",
    upload: "",
    conta: "",
  };

  const email = sessionStorage.getItem("user_email");

  active[props.elementoAtivo] = "active";

  return (
    <div className={`sidebar ${menuOpen ? "open" : ""}`}>
      <div className="sidebar-title">
        <img src={logo} alt="Logo Zarpar" />
      </div>
      <div className="menu">
        {/* Botão para abrir/fechar o menu */}
        {/* Links do menu */}
        <ul>
          {(email === "ffleck@gmail.com" || email === "alvaro@karavel.com.br") && (
            <li className={active.admin}>
              <img src="/imagens/menu/gear.svg" style={{ "width": "25px","height": "25px"}}  alt=""/>
              <Link to="/admin"><strong>Painel de Controle</strong></Link>
            </li>
          )}

          {(email === "ffleck@gmail.com" || email === "alvaro@karavel.com.br") && (        
            <li className={active.cadastros}>
              <img src="/imagens/menu/impulsionar.svg" style={{ "width": "25px","height": "25px"}}  alt=""/>
              <Link to="/cadastros"><strong>Cadastros</strong></Link>
            </li>
          )}
          <li className={active.dashboard}>
            <img src="/imagens/menu/home.svg" style={{ "width": "25px","height": "25px"}} alt="" />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={active.cotacoes}>
            <img src="/imagens/menu/cotacao.svg" style={{ "width": "25px","height": "25px"}}  alt=""/>
            <Link to="/cotacoes">Cotação - SPOT</Link>
          </li>
          <li className={active.cotacoes_nac}>
            <img src="/imagens/menu/cotacoes_nac.svg" style={{ "width": "25px","height": "25px"}}  alt=""/>
            <Link to="/nac">Cotação - NAC</Link>
          </li>
          <li className={active.bookings}>
            <img src="/imagens/menu/booking.svg" style={{ "width": "25px","height": "25px"}} alt=""/>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className={active.armadors}>
            <img src="/imagens/menu/tracking.svg" style={{ "width": "25px","height": "25px"}}  alt=""/>
            <Link to="/armadores">Armadores</Link>
          </li>
          {/* Renderiza o link de Upload apenas se o menu estiver aberto e o email for válido */}
          {(email === "ffleck@gmail.com" || email === "alvaro@karavel.com.br") && (
            <li className={active.upload}>
              <i className="fa-solid fa-upload"></i>
              <Link to="/upload">Upload</Link>
            </li>
          )}
          <li className={active.conta}>
            <img src="/imagens/menu/conta.svg" style={{ "width": "25px","height": "25px"}}  alt=""/>
            <Link to="/conta">Minha Conta</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
