import React, { ChangeEvent, FormEvent, useState } from "react";
import "./styles.css";
import logo from "../../assets/imagens/logo_escura.png";
import api from "../../services/api";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';  // Importa o InputMask

const Register = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeEmpresa: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const [signUp, setSignUp] = useState({
    success: undefined,
    message: undefined,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const { telefone, cep, senha } = formData;

    if (telefone.replace(/\D/g, '').length !== 11) {
      return "O telefone está fora do padrão.";
    }

    if (cep.length !== 8 || Number.isNaN(Number(cep))) {
      return "O CEP está fora do padrão.";
    }

    if (senha.length < 6) {
      return "A senha deve possuir, no mínimo, 6 caracteres.";
    }

    return null;
  };

  const handleSubmitCadastrar = async (event: FormEvent) => {
    event.preventDefault();
    const validationError = validateFields();

    if (validationError) {
      setSignUp({ success: false, message: validationError });
      return;
    }

    const dataToSend = { userData: formData };

    try {
      await api.post("/user/register", dataToSend);
      setSignUp({ message: "Usuário cadastrado com sucesso", success: true });
      setFormData({
        nomeCompleto: "",
        nomeEmpresa: "",
        endereco: "",
        cidade: "",
        estado: "",
        cep: "",
        email: "",
        telefone: "",
        senha: "",
      });
    } catch (err) {
      const errorCode = err.response?.data?.errorCode;

      if (errorCode === 11000) {
        setSignUp({ success: false, message: "Esse e-mail já está cadastrado!" });
      } else {
        setSignUp({
          success: false,
          message: "Houve um problema ao cadastrar o usuário. Tente novamente mais tarde.",
        });
      }
    }
  };

  const renderAlert = () => {
    if (signUp.success !== undefined) {
      return (
        <div className={`alert ${signUp.success ? "alert-success" : "alert-danger"}`} role="alert">
          {signUp.message}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src="imagens/logo_home_2.jpeg" alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <div className="register">
          <div className="register-title">
            <img src={logo} alt="logo_zarpar" />
            <br />
            <br />
          </div>
          <form className="row g-3" onSubmit={handleSubmitCadastrar}>
            {renderAlert()}

            <div className="col-12">
              <label htmlFor="nomeCompleto" className="form-label">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="nomeCompleto"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="nomeEmpresa" className="form-label">Nome da Empresa</label>
              <input
                type="text"
                className="form-control"
                id="nomeEmpresa"
                name="nomeEmpresa"
                value={formData.nomeEmpresa}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cidade" className="form-label">Cidade</label>
              <input
                type="text"
                className="form-control"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="estado" className="form-label">Estado</label>
              <select
                id="estado"
                className="form-select"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
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
            <div className="col-md-4">
              <label htmlFor="cep" className="form-label">CEP</label>
              <input
                type="text"
                className="form-control"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="00000000"
                required
              />
            </div>
            <div className="col-md-8">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <InputMask
                mask="(99) 99999 9999"
                className="form-control"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(99) 9999 9999"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="senha" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-primary">Cadastrar</button>
            </div>
            <div className="col-6">
              <button className="btn btn-primary">
                <Link to="/" className="text-decoration-none" style={{ color: "white" }}>
                  Voltar para o login
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
