import { Button , Form } from 'react-bootstrap';
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import "./styles.css";

const AddContainers = () => {
  const [cordaFonte, setcordaFonte] = useState('');
  const [tipodaFonte, settipodaFonte] = useState('');
  const email = sessionStorage.getItem("user_email");
  
  let navigate = useNavigate();

  const routeChange = () =>{ navigate("/cadastros")}

  const saveContainer = async (event, dataToSend) => {
    event.preventDefault();
    await api.post('/containers/new', dataToSend)
    .then((res) => {
      console.log("Container Cadastrado com Sucesso");
    })
    .catch(err => {
      console.log("Ocorreu um problema ao salvar no banco de dados");
    })
  }

  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, text, number, textarea, textField');
    const dataForm = {};
    formElements.forEach((element: any) => {
        dataForm[element.name] = element.value || null;
    });
    return dataForm;
  };

  const createNewContainer = async (event) => {
    event.preventDefault()
  
    const dataToSend = {
        email,
        ...extractFormData()

    };

  
    if (!dataToSend.idItem || !dataToSend.name || !dataToSend.weight) {
      setcordaFonte("red")
      settipodaFonte("bold")
      alert('Preencha todos os campos obrigatórios')
    } else {
      try {
        saveContainer(event, dataToSend);
        routeChange();
      } catch (error) {
          console.error("Ocorreu um problema ao salvar no banco de dados:", error);
      }
    }
  }


  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cadastros"/>
      <main>
        <HeaderPage nomeOpcao="Containers"/>
        <div className="main-content">
          <p className="titulo-texto">Containers / Novo Container</p> 

          <form className="form"  onSubmit={createNewContainer}>
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="main-content">
                  <form className="form">
                    <div className="col-md-12">
                      <section className="pedido-reserva">
                        <div className="topo">
                          <h2 className="titulo-secao">Novo Container</h2>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                              <Form.Label htmlFor="idItem" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Id Item *</Form.Label>
                              <Form.Control
                                type="text"
                                id="idItem"
                                name="idItem"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="idItem"
                              />
                              <Form.Text id="idItem"></Form.Text>
                          </div>
                          <div className="col-md-4">
                            <Form.Label htmlFor="name" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Name *</Form.Label>
                              <Form.Control
                                type="text"
                                id="name"
                                name="name"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="name"
                              />
                              <Form.Text id="name"></Form.Text>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="weight" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Weight *</Form.Label>
                              <Form.Control
                                type="text"
                                id="weight"
                                name="weight"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="weight"
                              />
                              <Form.Text id="weight"></Form.Text>
                          </div>
                        </div>
                        <div className='row'>
                          <p></p>
                          <span className='small text-start'>
                            * Campos obrigatórios
                          </span>
                        </div>
                      </section>
                    </div>
                  </form>
                </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Button type="button" onClick={routeChange} className="btn btn-danger botao">Cancelar</Button>
                      </div>
                      <div className="col-md-6">
                        <Button type="submit" className="botao">Salvar</Button>
                      </div>
                    </div>
              </section>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddContainers;
