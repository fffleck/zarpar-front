import { Button , Form } from 'react-bootstrap';
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Autocomplete, FormGroup, TextField } from '@mui/material';
import "./styles.css";

interface PortoSelect {
  port_id: string;
  port_name: string;
}

interface ItemSelect {
  idItem: any;
  name: string;
}
const AddTaxes = () => {
  const [tiposContainer, setTiposContainer] = useState<ItemSelect[]>([]);
  const [cordaFonte, setcordaFonte] = useState('');
  const [tipodaFonte, settipodaFonte] = useState('');
  const email = sessionStorage.getItem("user_email");
  const [armadores, setArmadores] = useState([]);
  const [valuePortoEmbarque, setValuePortoEmbarque] = useState();
  const [valueTipoContainer, setValueTipoContainer] = useState();
  const [inputValueTipoContainer, setInputValueTipoContainer] = useState("");
  const [portosEmbarque, setPortosEmbarque] = useState<PortoSelect[]>([]);
  const [inputValuePortoEmbarque, setInputValuePortoEmbarque] = useState("");
  
  let navigate = useNavigate();

  const routeChange = () =>{ navigate("/cadastros")}

  useEffect(() => {
    api.get('filters/armadores').then(resp => {
      setArmadores(resp.data)
    })

    api.get("filters/portos_embarque").then((response) => {
      setPortosEmbarque(response.data);
    });


    api.get("filters/tipos_container").then((response) => {
      setTiposContainer(response.data);
    });

  }, []);



  const listaPortosEmbarque = portosEmbarque.map((portoEmbarque) => ({
    label: portoEmbarque.port_name,
    id: portoEmbarque.port_id,
  }));


  const listaTiposContainer = tiposContainer.map((tipoContainer) => ({
    label: tipoContainer.name,
    id: tipoContainer.idItem,
  }));

  
  const saveTaxes = async (event, dataToSend) => {
    event.preventDefault();
    await api.post('/taxes/new', dataToSend)
    .then((res) => {
      console.log("Taxa Cadastrada com Sucesso");
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

  const createNewTaxas = async (event) => {
    event.preventDefault()
  
    const dataToSend = {
        email,
        ...extractFormData()

    };

  
    if (!dataToSend.sentido || !dataToSend.armador || !dataToSend.porto || 
      !dataToSend.container || !dataToSend.taxname || !dataToSend.currency || !dataToSend.taxValue || 
      !dataToSend.applicability) {
      setcordaFonte("red")
      settipodaFonte("bold")
      alert('Preencha todos os campos obrigatórios')
    } else {
      try {
        saveTaxes(event, dataToSend);
        routeChange();
      } catch (error) {
          console.error("Ocorreu um problema ao reservar o booking:", error);
      }
    }
  }


  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="bookings"/>
      <main>
        <HeaderPage nomeOpcao="Booking"/>
        <div className="main-content">
          <p className="titulo-texto">Taxes / Nova Taxa</p> 

          <form className="form"  onSubmit={createNewTaxas}>
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="main-content">
                  <form className="form">
                    <div className="col-md-12">
                      <section className="pedido-reserva">
                        <div className="topo">
                          <h2 className="titulo-secao">Nova Taxa</h2>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                              <Form.Label htmlFor="moveType" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Direção *</Form.Label>
                                <Form.Select id="moveType" name="sentido" className='selecao' aria-label="Default select" >
                                  <option value="" selected>Selecione</option>
                                  <option value="EXPORTACAO">Exportação</option>
                                  <option value="IMPORTACAO">Importação</option>
                                </Form.Select>
                          </div>
                          <div className="col-md-4">
                              <FormGroup>
                                <Form.Label htmlFor="armador" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Armador *</Form.Label>
                                <Form.Select id="armador" name="armador" className='selecao' aria-label="Default select">
                                  <option>Selecione</option>
                                  {armadores.map((armador) => (
                                    <option key={armador.idArmador} value={armador.name}>{armador.name}</option>
                                  ))}
                                </Form.Select>
                              </FormGroup>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="porto" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Porto Origem * </Form.Label>
                              <Autocomplete
                                value={valuePortoEmbarque}
                                onChange={(event, newValue) => {
                                  setValuePortoEmbarque(newValue);
                                }}
                                inputValue={inputValuePortoEmbarque}
                                onInputChange={(event, newInputValue) => {
                                  setInputValuePortoEmbarque(newInputValue);
                                }}
                                className="selecao"
                                disablePortal
                                id="porto"
                                options={listaPortosEmbarque}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                  <TextField {...params} label="Porto de embarque" name='porto' required />
                                )}
                              />
                              </div>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                          <Form.Label htmlFor="container" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Tipo Container *</Form.Label>
                            <Autocomplete
                              value={valueTipoContainer}
                              onChange={(event, newValue) => {
                                setValueTipoContainer(newValue);
                              }}
                              inputValue={inputValueTipoContainer}
                              onInputChange={(event, newInputValue) => {
                                setInputValueTipoContainer(newInputValue);
                              }}
                              className="selecao"
                              disablePortal
                              id="container"
                              options={listaTiposContainer}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              renderInput={(params) => (
                                <TextField {...params} label="Tipo de container" name='container' required />
                              )}
                            />
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="taxname" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Tax Name *</Form.Label>
                              <Form.Control
                                type="text"
                                id="taxname"
                                name="taxname"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="taxname"
                              />
                              <Form.Text id="taxname"></Form.Text>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="moveType" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Currency *</Form.Label>
                                <Form.Select id="currency" name="currency" className='selecao' aria-label="Default select">
                                  <option value="" selected>Selecione</option>
                                  <option value="USD">Dolar (USD)</option>
                                  <option value="BRL">Real (BRL)</option>
                                  <option value="EUR">Euro (EUR)</option>
                                </Form.Select>
                          </div>
                        </div>
                        <div className='row'>
                        <div className="col-md-4">
                              <Form.Label htmlFor="taxValue" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Valor *</Form.Label>
                              <Form.Control
                                type="number"
                                id="taxValue"
                                name="taxValue"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="taxValue"
                              />
                              <Form.Text id="taxValue"></Form.Text>
                          </div>
                        <div className="col-md-4">
                              <Form.Label htmlFor="applicability" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Applicability *</Form.Label>
                                <Form.Select id="applicability" name="applicability" className='selecao' aria-label="Default select">
                                  <option value="" selected>Selecione</option>
                                  <option value="U">Unica (por viagem)</option>
                                  <option value="C">Container (por container)</option>
                                </Form.Select>
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

export default AddTaxes;
