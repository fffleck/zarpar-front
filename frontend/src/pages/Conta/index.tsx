import React from "react";
import "./styles.css";
// import { Link } from "react-router-dom";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";

const Conta = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="conta"/>
      <main>
        <HeaderPage nomeOpcao="Conta"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Conta</h2>
            <div className="conta-parent">
              <div className="conta-img"></div>
              <div className="conta-form">
                <form className="row g-3">
                  {/* <P></P>    */}
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Nome Completo"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputext" className="form-label">
                      Empresa
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputtext"
                      placeholder="Empresa"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputtext" className="form-label">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputtext"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="E-mail"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">
                      Endereço
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Endereço"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      Cidade
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                      Estado
                    </label>
                    <select id="inputState" className="form-select" required>
                      <option selected>Acre</option>
                      <option>Acre</option>
                      <option>Alagoas</option>
                      <option>Amapá</option>
                      <option>Amazonas</option>
                      <option>Bahia</option>
                      <option>Ceará</option>
                      <option>Distrito Federal</option>
                      <option>Espírito Santo</option>
                      <option>Goiás</option>
                      <option>Maranhão</option>
                      <option>Mato Grosso</option>
                      <option>Mato Grosso do Sul</option>
                      <option>Minas Gerais</option>
                      <option>Pará</option>
                      <option>Paraíba</option>
                      <option>Paraná</option>
                      <option>Pernambuco</option>
                      <option>Piauí</option>
                      <option>Rio de Janeiro</option>
                      <option>Rio Grande do Norte</option>
                      <option>Rio Grande do Sul</option>
                      <option>Rondônia</option>
                      <option>Roraima</option>
                      <option>Santa Catarina</option>
                      <option>São Paulo</option>
                      <option>Sergipe</option>
                      <option>Tocantins</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">
                      CEP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Salvar
                    </button>
                  </div>
                  <p></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Conta;
