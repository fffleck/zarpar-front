import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { error } from "console";

interface ItemArmador {
  idArmador: any;
  name: string;
}


const AddFornecedores = () => {
  const [armadores, setArmadores] = useState<ItemArmador[]>([]);
  const [selectedTradelanes, setSelectedTradelanes] = useState<string[]>([]);
  let navigate = useNavigate();

  const routeChange = () => { 
    navigate("/fornecedores");
  };

  useEffect(() => {
    api.get("filters/armadores").then((response) => {
      setArmadores(response.data);
    });
  }, []);



  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, textarea');
    const formData = {};
    formElements.forEach((element: any) => {
      formData[element.name] = element.value || null;
    });
    return formData;
  };

  const handleTradelaneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedTradelanes(selectedOptions);
  };

  const AddFornecedor = async (event) => {
    event.preventDefault();

    const dataToSend = { ...extractFormData()};

    dataToSend.tradelane =  selectedTradelanes
    dataToSend.email = sessionStorage.getItem("user_email");
  
    api.post('/fornecedor/add', dataToSend).then((response) => {
      console.log(response)
      if (response.data.success == true) {
        routeChange();
      } else {
        alert(response.data.message)
      }
    }).catch(err =>{
      alert(err.message)
      console.error(err.message);
    })
  };

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cotacoesNAC" />
      <main>
        <HeaderPage nomeOpcao="Fornecedores" />
        <div className="main-content">
          <div className="main-content-title">
            <h2>Fornecedores</h2>
          </div>{" "}
          <form className="row g-3 formulario" onSubmit={AddFornecedor}>
            <div className="col-md-4">
              <div className='row'>
                <div className="col-md-5">
                  <label htmlFor="inputState" className="form-label">Operador</label>
                </div>
                <div className="col-md-7">
                  <select name="armador" id="armador" className="form-select" required>
                      <option>Selecione</option>
                      {armadores.map((armador) => (
                        <option key={armador.idArmador} value={armador.idArmador}>{armador.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <p></p>
              <div className='row'>
                <div className="col-md-5">
                  <label htmlFor="inputState" className="form-label">Nome</label>
                </div>
                <div className="col-md-7">
                  <input type="text" name="nome" id="nome" className="form-input" style={{ width: '300px'}} required></input>
                </div>
              </div>
              <p></p>
              <div className='row'>
                <div className="col-md-5">
                  <label htmlFor="inputState" className="form-label">E-mail</label>
                </div>
                <div className="col-md-7">
                  <input type="email" name="email" id="email" className="form-input" style={{ width: '300px'}} required></input>
                </div>
              </div>
              <p></p>
              <div className='row'>
                <div className="col-md-5">
                  <label htmlFor="inputState" className="form-label">Celular ou Telefone</label>
                </div>
                <div className="col-md-7">
                  <input type="text" name="phone" id="phone" className="form-input" style={{ width: '300px'}} required></input>
                </div>
              </div>
              <p></p>
              <div className='row'>
                <div className="col-md-5">
                  <label htmlFor="inputState" className="form-label">TradeLane <p><small>use(ctrl) para selecionar +1</small></p></label>
                </div>
                <div className="col-md-7">
                  <select
                    name="tradelane"
                    id="tradelane"
                    className="form-select"
                    multiple
                    value={selectedTradelanes}
                    onChange={handleTradelaneChange}
                    required
                  >
                    <option value="global">Global</option>
                    <option value="TPEastbound">Trans-Pacific (Eastbound)</option>
                    <option value="TPWestbound">Trans-Pacific (Westbound)</option>
                    <option value="AEWestbound">Asia-Europe (Westbound)</option>
                    <option value="EAEastbound">Europe-Asia (Eastbound)</option>
                    <option value="Asia">Asia-Asia</option>
                    <option value="TAEurope">Trans-Atlantic (Europe)</option>
                    <option value="TAUS">Trans-Atlantic (US)</option>
                    <option value="FALA">From Asia to Latin America</option>
                    <option value="FLAA">From Latin America to Asia</option>
                    <option value="FELA">From Europe to Latin America</option>
                    <option value="FLAE">From Latin America to Europe</option>
                    <option value="FNALA">From North America to Latin America</option>
                    <option value="FLANA">From Latin America to North America</option>
                    <option value="LA">Latin America – Latin America </option>
                  </select>
                </div>
              </div>
              <p></p>
              <p></p>
              <p></p>
              <div className='row'>
                <div className="col-md-5" style={{textAlign: "right"}}>
                  <Button type="reset" className="btn-info">Limpar</Button>
                </div>
                <div className="col-md-5" style={{textAlign: "left"}}>
                  <Button type="submit" className="btn-primary">Cadastrar</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddFornecedores;




