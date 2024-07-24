import React, { useEffect, useState } from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import api from "../../services/api";
import InputMask from 'react-input-mask';  // Importa o InputMask


const Conta = () => {
  const [nomeEmbarcador, setNomeEmbarcador] = useState("");
  const [enderecoEmbarcador, setEnderecoEmbarcador] = useState("");
  const [cnpjEmbarcador, setCnpjEmbarcador] = useState("");
  const [telefoneEmbarcador, setTelefoneEmbarcador] = useState("");
  const [cityEmbarcador, setCityEmbarcador] = useState("");
  const [stateEmbarcador, setStateEmbarcador] = useState("");
  const [zipCodeEmbarcador, setZipCodeEmbarcador] = useState("");
  const [empresaEmbarcador, setEmpresaEmbarcador] = useState("");
  const email = sessionStorage.getItem("user_email");

  useEffect(() => {
    api
      .post("/user/find_user", { email })
      .then((resp) => {
        setNomeEmbarcador(resp.data.user.name);
        setEnderecoEmbarcador(resp.data.user.address);
        setCnpjEmbarcador(resp.data.user.cnpj);
        setTelefoneEmbarcador(resp.data.user.telefone);
        setEmpresaEmbarcador(resp.data.user.enterpriseName);
        setCityEmbarcador(resp.data.user.city);
        setStateEmbarcador(resp.data.user.state);
        setZipCodeEmbarcador(resp.data.user.zipCode);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nomeEmbarcador,
      address: enderecoEmbarcador,
      cnpj: cnpjEmbarcador,
      telefone: telefoneEmbarcador,
      enterpriseName: empresaEmbarcador,
      city: cityEmbarcador,
      state: stateEmbarcador,
      zipCode: zipCodeEmbarcador,
      email,
    };
    api.post("/user/update_user", data).then(() => {
      alert("Dados atualizados com sucesso!");
    });
  };

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="conta" />
      <main>
        <HeaderPage nomeOpcao="Conta" />
        <div className="main-content">
          <div className="main-content-title">
            <h2>Conta</h2>
            <div className="conta-parent">
              <div className="conta-img"></div>
              <div className="conta-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      value={nomeEmbarcador}
                      onChange={(e) => setNomeEmbarcador(e.target.value)}
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
                      value={empresaEmbarcador}
                      onChange={(e) => setEmpresaEmbarcador(e.target.value)}
                      placeholder="Empresa"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputtext" className="form-label">
                      Telefone
                    </label>
                    <InputMask
                      mask="(99) 99999 9999"
                      className="form-control"
                      id="telefone"
                      name="telefone"
                      value={telefoneEmbarcador}
                      onChange={(e) => setTelefoneEmbarcador(e.target.value)}
                      placeholder="(99) 99999 9999"
                      required
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
                      value={email}
                      readOnly
                      placeholder="E-mail"
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
                      value={enderecoEmbarcador}
                      onChange={(e) => setEnderecoEmbarcador(e.target.value)}
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
                      value={cityEmbarcador}
                      onChange={(e) => setCityEmbarcador(e.target.value)}
                      id="inputCity"
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
                      value={stateEmbarcador}
                      onChange={(e) => setStateEmbarcador(e.target.value)}
                      required
                    >
                      <option value="Acre">Acre</option>
                      <option value="Alagoas">Alagoas</option>
                      <option value="Amapá">Amapá</option>
                      <option value="Amazonas">Amazonas</option>
                      <option value="Bahia">Bahia</option>
                      <option value="Ceará">Ceará</option>
                      <option value="Distrito Federal">Distrito Federal</option>
                      <option value="Espírito Santo">Espírito Santo</option>
                      <option value="Goiás">Goiás</option>
                      <option value="Maranhão">Maranhão</option>
                      <option value="Mato Grosso">Mato Grosso</option>
                      <option value="Mato Grosso do Sul">
                        Mato Grosso do Sul
                      </option>
                      <option value="Minas Gerais">Minas Gerais</option>
                      <option value="Pará">Pará</option>
                      <option value="Paraíba">Paraíba</option>
                      <option value="Paraná">Paraná</option>
                      <option value="Pernambuco">Pernambuco</option>
                      <option value="Piauí">Piauí</option>
                      <option value="Rio de Janeiro">Rio de Janeiro</option>
                      <option value="Rio Grande do Norte">
                        Rio Grande do Norte
                      </option>
                      <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                      <option value="Rondônia">Rondônia</option>
                      <option value="Roraima">Roraima</option>
                      <option value="Santa Catarina">Santa Catarina</option>
                      <option value="São Paulo">São Paulo</option>
                      <option value="Sergipe">Sergipe</option>
                      <option value="Tocantins">Tocantins</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">
                      CEP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={zipCodeEmbarcador}
                      onChange={(e) => setZipCodeEmbarcador(e.target.value)}
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
