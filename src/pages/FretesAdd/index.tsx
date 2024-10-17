import { Button , Form } from 'react-bootstrap';
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Autocomplete, FormGroup, TextField } from '@mui/material';
import "./styles.css";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";


interface PortoSelect {
  port_id: string;
  port_name: string;
}

interface ItemSelect {
  idItem: any;
  name: string;
}
const AddFretes = () => {
  const [tiposContainer, setTiposContainer] = useState<ItemSelect[]>([]);
  const [cordaFonte, setcordaFonte] = useState('');
  const [tipodaFonte, settipodaFonte] = useState('');
  const email = sessionStorage.getItem("user_email");
  const [armadores, setArmadores] = useState([]);
  const [valuePortoEmbarque, setValuePortoEmbarque] = useState();
  const [valuePortoDescarga, setValuePortoDescarga] = useState();
  const [valueTipoContainer, setValueTipoContainer] = useState();
  const [inputValueTipoContainer, setInputValueTipoContainer] = useState("");
  const [portosEmbarque, setPortosEmbarque] = useState<PortoSelect[]>([]);
  const [portosDescarga, setPortosDescarga] = useState<PortoSelect[]>([]);
  const [inputValuePortoEmbarque, setInputValuePortoEmbarque] = useState("");
  const [inputValuePortoDescarga, setInputValuePortoDescarga] = useState("");
  const [valueMercadoria, setValueMercadoria] = useState();
  const [inputValueMercadoria, setInputValueMercadoria] = useState("");
  const [mercadorias, setMercadorias] = useState<ItemSelect[]>([]);
  const [formDataEarly, setFormDataEarly] = useState<Dayjs | null>();
  const [formDataLatest, setFormDataLatest] = useState<Dayjs | null>();
  
  
  
  
  let navigate = useNavigate();

  const routeChange = () =>{ navigate("/cadastros")}

  useEffect(() => {
    api.get('filters/armadores').then(resp => {
      setArmadores(resp.data)
    })

    api.get("filters/portos_embarque").then((response) => {
      setPortosEmbarque(response.data);
    });

    api.get("filters/portos_descarga").then((response) => {
      setPortosDescarga(response.data);
    });


    api.get("filters/tipos_container").then((response) => {
      setTiposContainer(response.data);
    });

    api.get("filters/mercadorias").then((response) => {
      setMercadorias(response.data);
    });

    api.get("filters/mercadorias").then((response) => {
      setMercadorias(response.data);
    });


  }, []);

    

    function handleInputChangeEarly(event) {
      setFormDataEarly(dayjs(`${event.$y}-${event.$M + 1}-${event.$D}`));
    }
  
    function handleInputChangeLatest(event) {
      const dt_embarque = new Date((formDataEarly.$y)+"-"+(formDataEarly.$M+1)+"-"+(formDataEarly.$D))
      const dt_chegada = new Date((event.$y)+"-"+(event.$M+1)+"-"+(event.$D))
  
      if (dt_embarque > dt_chegada) {
        setFormDataLatest(null)
        alert('Datas incorretas')
      } else{
        setFormDataLatest(dayjs(`${event.$y}-${event.$M + 1}-${event.$D}`));
      }
    }

  const listaPortosEmbarque = portosEmbarque.map((portoEmbarque) => ({
    label: portoEmbarque.port_name,
    id: portoEmbarque.port_id,
  }));
  
  const listaPortosDescarga = portosDescarga.map((portoDescarga) => ({
    label: portoDescarga.port_name,
    id: portoDescarga.port_id,
  }));

  const listaTiposContainer = tiposContainer.map((tipoContainer) => ({
    label: tipoContainer.name,
    id: tipoContainer.idItem,
  }));

  const listaMercadorias = mercadorias.map((mercadoria) => ({
    label: mercadoria.name,
    id: mercadoria.idItem,
  }));

  
  const saveFretes = async (event, dataToSend) => {
    event.preventDefault();
    await api.post('/fretes/new', dataToSend)
    .then((res) => {
      console.log("Frete Cadastrado com Sucesso");
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

  const createNewFrete = async (event) => {
    event.preventDefault()
  
    const dataToSend = {
        email,
        ...extractFormData()

    };
  

    if (!dataToSend.mercadoria || !dataToSend.container || !dataToSend.armador || 
      !dataToSend.porto_embarque || !dataToSend.porto_descarga || !dataToSend.navio || !dataToSend.data_embarque || 
      !dataToSend.tempo_de_transito || !dataToSend.data_chegada || !dataToSend.base_freight || !dataToSend.bunker || !dataToSend.isps ) {
      setcordaFonte("red")
      settipodaFonte("bold")
      alert('Preencha todos os campos obrigatórios')
    } else {
      try {
        saveFretes(event, dataToSend);
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

          <form className="form"  onSubmit={createNewFrete}>
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="main-content">
                  <form className="form">
                    <div className="col-md-12">
                      <section className="pedido-reserva">
                        <div className="topo">
                          <h2 className="titulo-secao">Novo Frete Maritmo</h2>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                              <Form.Label htmlFor="mercadoria" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Mercadoria *</Form.Label>
                                <Form.Select id="mercadoria" name="mercadoria" className='selecao' aria-label="Default select" >
                                  <option>Selecione</option>
                                  {mercadorias.map((mercadoria) => (
                                    <option key={mercadoria.idItem} value={mercadoria.idItem}>{mercadoria.name}</option>
                                  ))}
                                </Form.Select>
                          </div>
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
                        </div>
                        <div className='row'>
                        <div className="col-md-4">
                              <Form.Label htmlFor="porto_embarque" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Porto Origem * </Form.Label>
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
                                id="porto_embarque"
                                options={listaPortosEmbarque}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                  <TextField {...params} label="Porto de embarque" name='porto_embarque' required />
                                )}
                              />
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="porto_descarga" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Porto Destino * </Form.Label>
                              <Autocomplete
                                value={valuePortoEmbarque}
                                onChange={(event, newValue) => {
                                  setValuePortoDescarga(newValue);
                                }}
                                inputValue={inputValuePortoDescarga}
                                onInputChange={(event, newInputValue) => {
                                  setInputValuePortoDescarga(newInputValue);
                                }}
                                className="selecao"
                                disablePortal
                                id="porto"
                                options={listaPortosDescarga}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                  <TextField {...params} label="Porto de descarga" name='porto_descarga' required />
                                )}
                              />
                          </div>
                         
                          <div className="col-md-4">
                              <Form.Label htmlFor="navio" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Nome Navio *</Form.Label>
                              <Form.Control
                                type="text"
                                id="navio"
                                name="navio"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="navio"
                              />
                              <Form.Text id="navio"></Form.Text>
                          </div>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                            <Form.Label htmlFor="earlyDepartureDate"  style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Data Embarque </Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                disablePast
                                label="Data de embarque"
                                className="data"
                                name='data_embarque'
                                defaultValue={""}
                                value={formDataEarly}
                                onChange={handleInputChangeEarly}
                              />
                            </LocalizationProvider>
                          </div>

                          <div className="col-md-4">
                              <Form.Label htmlFor="tempo_de_transito" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Tempo de Transito *</Form.Label>
                              <Form.Control
                                type="number"
                                id="navio"
                                min={1}
                                max={99}
                                name="tempo_de_transito"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="tempo_de_transito"
                              />
                              <Form.Text id="tempo_de_transito"></Form.Text>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="latestDeliveryDate"  style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Data Descarga </Form.Label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  disablePast
                                  label="Data de Chegada"
                                  className="data"
                                  minDate={formDataEarly}
                                  name='data_chegada'
                                  defaultValue={""}
                                  value={formDataLatest}
                                  onChange={handleInputChangeLatest}
                                />
                              </LocalizationProvider>
                              </div>
                        </div>
                        <div className='row'>
                        <div className="col-md-4">
                              <Form.Label htmlFor="base_freight" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Base Freight *</Form.Label>
                              <Form.Control
                                type="number"
                                id="base_freight"
                                name="base_freight"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="base_freight"
                              />
                              <Form.Text id="base_freight"></Form.Text>
                        </div>
                        <div className="col-md-4">
                              <Form.Label htmlFor="bunker" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Bunker *</Form.Label>
                              <Form.Control
                                type="number"
                                id="bunker"
                                name="bunker"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="bunker"
                              />
                              <Form.Text id="bunker"></Form.Text>
                        </div>
                        <div className="col-md-4">
                              <Form.Label htmlFor="isps" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> ISPS *</Form.Label>
                              <Form.Control
                                type="number"
                                id="isps"
                                name="isps"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="isps"
                              />
                              <Form.Text id="isps"></Form.Text>
                        </div>
                        </div>
                        <div className='row'>
                        <div className="col-md-4">
                              <Form.Label htmlFor="transbordo" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Transbordo</Form.Label>
                              <Form.Control
                                type="text"
                                id="transbordo"
                                name="transbordo"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="transbordo"
                              />
                              <Form.Text id="transbordo"></Form.Text>
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

export default AddFretes;
