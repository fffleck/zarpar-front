import React, { ChangeEvent, FormEvent, useState } from "react";
import "./styles.css";
import logo from "../../assets/imagens/logo_blue_original.png";
import api from "../../services/api";

const Register = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCEP] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [signUp, setSignUp] = useState({
    success: undefined,
    message: undefined,
  });

  function handleInputNome(event: ChangeEvent<HTMLInputElement>) {
    const nome = event.target.value;

    setNomeCompleto(nome);
  }

  function handleInputNomeEmpresa(event: ChangeEvent<HTMLInputElement>) {
    const nome = event.target.value;

    setNomeEmpresa(nome);
  }

  function handleInputEndereco(event: ChangeEvent<HTMLInputElement>) {
    const endereco = event.target.value;

    setEndereco(endereco);
  }

  function handleInputCidade(event: ChangeEvent<HTMLInputElement>) {
    const cidade = event.target.value;

    setCidade(cidade);
  }

  function handleSelectEstado(event: ChangeEvent<HTMLSelectElement>) {
    const estado = event.target.value;

    setEstado(estado);
  }

  function handleInputCEP(event: ChangeEvent<HTMLInputElement>) {
    const cep = event.target.value;

    setCEP(cep);
  }

  function handleInputEmail(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;

    setEmail(email);
  }

  function handleInputSenha(event: ChangeEvent<HTMLInputElement>) {
    const senha = event.target.value;

    setSenha(senha);
  }

  async function handleSubmitCadastrar(event: FormEvent) {
    event.preventDefault();

    if (cep.length !== 8 || Number.isNaN(Number(cep))) {
      setSignUp({
        success: false,
        message: "O CEP está fora do padrão.",
      });
      return;
    }
    if (senha.length < 6) {
      setSignUp({
        success: false,
        message: "A senha deve possuir, no mínimo, 6 caracteres.",
      });
      return;
    }

    const dataToSend = {
      userData: {
        name: nomeCompleto,
        enterpriseName: nomeEmpresa,
        address: endereco,
        city: cidade,
        state: estado,
        zipCode: cep + "",
        email: email,
        password: senha + "",
      },
    };

    await api
      .post("/user/register", dataToSend)
      .then(() => {
        setSignUp({
          message: "Usuário cadastrado com sucesso",
          success: true,
        });
        setNomeCompleto("");
        setNomeEmpresa("");
        setEndereco("");
        setCidade("");
        setEstado("");
        setCEP("");
        setEmail("");
        setSenha("");
      })
      .catch((err) => {
        const codigoDeErro = err.response.data.errorCode;

        if (codigoDeErro === 11000) {
          setSignUp({
            success: false,
            message: "Esse e-mail já está cadastrado!",
          });
        } else {
          setSignUp({
            success: false,
            message:
              "Houve um problema ao cadastrar o usuário. Tente novamente mais tarde.",
          });
        }
      });
  }

  function registerVerify(signUp: any) {
    if (signUp.success !== undefined) {
      return signUp.success ? (
        <div className="alert alert-success" role="alert">
          {signUp.message}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          {signUp.message}
        </div>
      );
    } else {
      return null;
    }
  }

  function avisoSenha(signUp: any) {
    if (signUp.success === undefined) {
      return (
        <div>
          <ul>
            <li>A senha deve ter no mínimo 6 caracteres</li>
            <li>O CEP é formado por 8 números, sem pontuações</li>
          </ul>
        </div>
      );
    }
  }

  return (
    <div className="register-parent">
      <div className="register">
        <div className="register-title">
          <img src={logo} alt="logo_blue_original" />
          <br />
          <br />
        </div>
        <form className="row g-3" onSubmit={handleSubmitCadastrar}>
          {registerVerify(signUp)}
          {avisoSenha(signUp)}

          <div className="col-12">
            <label htmlFor="inputAddress1" className="form-label">
              Nome Completo
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress1"
              value={nomeCompleto}
              onChange={handleInputNome}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Nome da Empresa
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              value={nomeEmpresa}
              onChange={handleInputNomeEmpresa}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress3" className="form-label">
              Endereço
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress3"
              value={endereco}
              onChange={handleInputEndereco}
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
              value={cidade}
              onChange={handleInputCidade}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              Estado
            </label>
            <select
              id="inputState"
              className="form-select"
              value={estado}
              onChange={handleSelectEstado}
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
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              CEP
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={cep}
              onChange={handleInputCEP}
              placeholder="00000000"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={email}
              onChange={handleInputEmail}
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
              value={senha}
              onChange={handleInputSenha}
              required
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
