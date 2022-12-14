import React from "react";
import "./styles.css";
import logo from "../../assets/imagens/logo_blue_original.png";

const Register = () => {
  return (
    <div className="register-parent">
      <div className="register">
        <div className="register-title">
          <img src={logo} alt="logo_blue_original" />
          <br />
          <br />
        </div>
        <form className="row g-3">
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Nome Completo
            </label>
            <input type="text" className="form-control" id="inputAddress2" />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Nome da Empresa
            </label>
            <input type="text" className="form-control" id="inputAddress2" />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Endereço
            </label>
            <input type="text" className="form-control" id="inputAddress" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              Cidade
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              Estado
            </label>
            <select id="inputState" className="form-select">
              <option selected>Selecione</option>
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
            <input type="text" className="form-control" id="inputZip" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="col-12">
            <div className="form-check">{/* </label> */}</div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
