import { Button , Form } from 'react-bootstrap';
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import Accordion from "react-bootstrap/esm/Accordion";
import SearchNcm from './Search/search-ncm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Autocomplete, TextField } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface PortoSelect {
  port_id: string;
  port_name: string;
}

interface ItemSelect {
  idItem: any;
  name: string;
}
const AddBooking = () => {
  const [qtdContainers, setQtdContainers] = useState<number>(1);
  const [mercadoria] = useState('');
  const [tipoMercadoria, setTipoMercadoria] = useState('');
  const [tiposContainer, setTiposContainer] = useState<ItemSelect[]>([]);
  const [cordaFonte, setcordaFonte] = useState('');
  const [tipodaFonte, settipodaFonte] = useState('');
  const email = sessionStorage.getItem("user_email");
  const [formDataEarly, setFormDataEarly] = useState<Dayjs | null>();
  const [formDataLatest, setFormDataLatest] = useState<Dayjs | null>();
  const [armadores, setArmadores] = useState([]);
  const [valuePortoEmbarque, setValuePortoEmbarque] = useState();
  const [valuePortoDescarga, setValuePortoDescarga] = useState();
  const [valueTipoContainer, setValueTipoContainer] = useState();
  const [inputValueTipoContainer, setInputValueTipoContainer] = useState("");
  const [portosEmbarque, setPortosEmbarque] = useState<PortoSelect[]>([]);
  const [portosDescarga, setPortosDescarga] = useState<PortoSelect[]>([]);
  const [inputValuePortoEmbarque, setInputValuePortoEmbarque] = useState("");
  const [inputValuePortoDescarga, setInputValuePortoDescarga] = useState("");
  
  

  let navigate = useNavigate();

  const routeBack = () =>{  navigate("/cotacoes");}

  const routeChange = () =>{ navigate("/pedido_resultado")}

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

  const sendEmailNewBooking = async(event, dataToSend) => {
    event.preventDefault();
    await api.post('/booking/send_email', dataToSend).then((res) => {
      console.log('Email Enviado para ADM');
    })
  }

  const saveBooking = async (event, dataToSend) => {
    event.preventDefault();
    await api.post('/booking/new', dataToSend)
    .then((res) => {
      console.log("Novo Booking salvo");
    })
    .catch(err => {
      console.log("Ocorreu um problema ao salvar o booking no banco de dados");
    })
  }

  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, textarea, textField');
    const dataForm = {};
    formElements.forEach((element: any) => {
        dataForm[element.name] = element.value || null;
    });
    return dataForm;
  };

  const sendBookingReserva = async (event) => {
    event.preventDefault()
  
    const dataToSend = {
        email,
        ...extractFormData()

    };

  
    if (!dataToSend.armador || !dataToSend.porto_embarque || !dataToSend.porto_descarga || 
      !dataToSend.data_embarque || !dataToSend.data_chegada || !dataToSend.qtdContainers || !dataToSend.tipo_container || 
      !dataToSend.nomeMercadoria || !dataToSend.paymentChargeType || !dataToSend.paymentTerm || !dataToSend.payer) {
      setcordaFonte("red")
      settipodaFonte("bold")
      alert('Preencha todos os campos obrigatórios')
    } else {
      try {
        saveBooking(event, dataToSend);
        sendEmailNewBooking(event, dataToSend)
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
          <p className="titulo-texto">Bookinks / Novo Booking</p> 

          <form className="form"  onSubmit={sendBookingReserva}>
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="topo">
                  <h2 className="titulo-secao">Novo Booking</h2>
                </div>
                <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header><span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> General Details *</span></Accordion.Header>
                        <Accordion.Body>
                            <div className='row'>
                                <div className="col-md-4">
                                <Form.Label htmlFor="selectCarrier"> Carrier / NVOCC / Booking Agent </Form.Label>
                                <select name="armador" id="armador" className="form-select" required>
                                  <option>Selecione</option>
                                  {armadores.map((armador) => (
                                    <option key={armador.idArmador} value={armador.idArmador}>{armador.name}</option>
                                  ))}
                              </select>
                                </div>
                                <div className="col-md-4">
                                <Form.Label htmlFor="contractNumber"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Contract Number*</span> </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="contractNumber"
                                  name="contractNumber"
                                  aria-required="true"
                                  aria-describedby="contractNumber"
                                />
                                <Form.Text id="contractNumber"></Form.Text>
                                </div>
                                <div className="col-md-4 right">
                                <Form.Label htmlFor="bookingOffice"> Booking Office </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="bookingOffice"
                                  name="bookingOffice"
                                  aria-required="true"
                                  aria-describedby="bookingOffice"
                                />
                                <Form.Text id="bookingOffice"></Form.Text>
                                </div>
                              </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header> Parties </Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                              <div className="col-md-4">
                              <Form.Label htmlFor="shipper"> Shipper </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="shipper"
                                  name="shipper"
                                  aria-required="true"
                                  aria-describedby="shipper"
                                />
                                <Form.Text id="shipper"></Form.Text>
                              </div>

                              <div className="col-md-4">
                              <Form.Label htmlFor="forwarder"> Forwarder </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="forwarder"
                                  name="forwarder"
                                  aria-required="true"
                                  aria-describedby="forwarder"
                                />
                                <Form.Text id="forwarder"></Form.Text>
                              </div>

                              <div className="col-md-4">

                              <Form.Label htmlFor="consignee"> Consignee </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="consignee"
                                  name="consignee"
                                  aria-required="true"
                                  aria-describedby="consignee"
                                />
                                <Form.Text id="consignee"></Form.Text>
                              </div>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header> References </Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                              <div className="col-md-4">
                              <Form.Label htmlFor="shipperRefNumber"> Shipper Reference Number </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="shipperRefNumber"
                                  name="shipperRefNumber"
                                  aria-required="true"
                                  aria-describedby="shipperRefNumber"
                                />
                                <Form.Text id="shipperRefNumber"></Form.Text>
                              </div>

                              <div className="col-md-4">
                              <Form.Label htmlFor="forward_ref_number"> Forwarder's Reference Number </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="forward_ref_number"
                                  name="forward_ref_number"
                                  aria-required="true"
                                  aria-describedby="forward_ref_number"
                                />
                                <Form.Text id="forward_ref_number"></Form.Text>
                              </div>

                              <div className="col-md-4">
                              <Form.Label htmlFor="purchaseOrderNumber">Purchase Order Number</Form.Label>
                                <Form.Control
                                  type="text"
                                  id="purchaseOrderNumber"
                                  name="purchaseOrderNumber"
                                  aria-required="true"
                                  aria-describedby="purchaseOrderNumber"
                                />
                                <Form.Text id="purchaseOrderNumber"></Form.Text>
                              </div>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header> Transpor </Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                              <div className="col-md-4">
                              <Form.Label htmlFor="moveType"> Move Type</Form.Label>
                                <Form.Select id="moveType" name="moveType" aria-label="Default select">
                                  <option value="PortToPort" selected>Port, Ramp, or CY to Port, Ramp, or CY</option>
                                  <option value="DoorToPort">Door to port, Ramp, or Cy </option>
                                  <option value="DoorToDoor">Door to Door</option>
                                  <option value="PortToDoor">Port Ramp, or Cy to Door</option>
                                </Form.Select>
                              </div>

                              <div className="col-md-4">
                              <Form.Label htmlFor="PlaceCarrier"> Place of Carrier Receipt </Form.Label>
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
                                id="combo-box-demo"
                                options={listaPortosEmbarque}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                  <TextField {...params} label="Porto de embarque" name='porto_embarque' required />
                                )}
                              />
                              </div>

                              <div className="col-md-4">
                              <Form.Label htmlFor="earlyDepartureDate"> Early Departure Date </Form.Label>
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
                          </div>
                          <p></p>
                          <div className='row'>
                              <div className="col-md-4">
                              </div>
                              <div className="col-md-4">
                              <Form.Label htmlFor="placeDelivery"> Place of Carrier Delivery</Form.Label>
                              <Autocomplete
                                value={valuePortoDescarga}
                                onChange={(event, newValue) => {
                                  setValuePortoDescarga(newValue);
                                }}
                                inputValue={inputValuePortoDescarga}
                                onInputChange={(event, newInputValue) => {
                                  setInputValuePortoDescarga(newInputValue);
                                }}
                                className="selecao"
                                disablePortal
                                id="combo-box-demo"
                                options={listaPortosDescarga}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                  <TextField {...params} label="Porto de descarga" name='porto_descarga' required />
                                )}
                              />
                              </div>

                              <div className="col-md-4">
                              <Form.Label htmlFor="latestDeliveryDate"> Latest Delivery Date </Form.Label>
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
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header> Containers </Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                              <div className="col-md-4">
                                <p className="item-ajuste__titulo">Quantidade de Containers</p>
                                <input type="number" name='qtdContainers' min={1} className="espacamento"/>
                              </div>
                              <div className="col-md-1">
                              </div>
                              <div className="col-md-7">
                                <p className="item-ajuste__titulo">Tipo de Container</p>
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
                                  id="combo-box-demo"
                                  options={listaTiposContainer}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Tipo de container" name='tipo_container' required />
                                  )}
                                />
                              </div>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="5">
                        <Accordion.Header><span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Cargo * </span></Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                            <p className="item-ajuste__titulo"><span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Digite parte do nome da mercadoria  </span></p>
                              <div className="col-md-12">
                              <SearchNcm mercadoria={mercadoria} />
                              </div>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="6">
                        <Accordion.Header><span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Payments Details *</span></Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                              <div className="col-md-4">
                                <Form.Label htmlFor="paymentChargeType"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Charge Type* </span></Form.Label>
                                <Form.Select id="paymentChargeType"  name="paymentChargeType" aria-label="Default select example">
                                  <option>Select ...</option>
                                  <option value="Additional">Additional Charges</option>
                                  <option value="OceanFreight">Basic Freight</option>
                                  <option value="DestinationHaulage">Destination Haulage Charges</option>
                                  <option value="DetinationTerminalHandling">Destination Port Charges</option>
                                  <option value="OriginTerminalHandling">Origin Port Charges</option>
                                  <option value="DestinationHaulage">Destination Haulage Charges</option>
                                </Form.Select>
                              </div>
                              <div className="col-md-2">
                                <Form.Label htmlFor="paymentTerm">  <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Payment Term* </span></Form.Label>
                                <Form.Select id="paymentTerm" name="paymentTerm" aria-label="Default select example">
                                  <option>Select ...</option>
                                  <option value="Prepaid">Pre-paid</option>
                                  <option value="Collect">Collect</option>
                                  <option value="PayableElsehere">Payable Elsewhere</option>
                                </Form.Select>
                              </div>

                              <div className="col-md-3">
                                <Form.Label htmlFor="payer"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Payer* </span> </Form.Label>
                                <Form.Select id="payer" name="payer" aria-label="Default select example">
                                  <option>Select ...</option>
                                  <option value="Booker">Booker</option>
                                  <option value="Consignee">Consignee</option>
                                  <option value="Contract Party">Contract Party</option>
                                  <option value="Forwarder">Forwarder</option>
                                  <option value="Main Notify Party">Main Notify Party</option>
                                  <option value="First Additional">First Additional Notify Party</option>
                                  <option value="Second Additional">Second Additional Notify Party</option>
                                  <option value="Shipper">Shipper</option>
                                </Form.Select>
                              </div>

                              <div className="col-md-3">
                              <Form.Label htmlFor="paymentLocation"> Payment Location </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="paymentLocation"
                                  name="paymentLocation"
                                  aria-required="true"
                                  aria-describedby="paymentLocation"
                                />
                                <Form.Text id="paymentLocation"></Form.Text>
                              </div>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <p></p>
                      <Accordion.Item eventKey="7">
                        <Accordion.Header>Comments & Notifications</Accordion.Header>
                        <Accordion.Body>
                          <div className='row'>
                              <div className="col-md-12">
                              <Form.Label htmlFor="customerComments"> Customer Comments </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  id="customerComments"
                                  name="customerComment"
                                  rows={3}
                                  aria-describedby="customerComments"
                                />

                              </div>

                              <div className="col-md-12">
                              <Form.Label htmlFor="emailnotifications"> Partner Email Notifications </Form.Label>
                                <Form.Control
                                  type="email"
                                  id="emailnotifications"
                                  name="emailnotifications"
                                  aria-describedby="customerComments"
                                />
                              </div>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion> 
                    <div className="row">
                      <div className="col-md-6">
                        <Button type="button" onClick={routeBack} className="btn btn-danger botao">Cancelar</Button>
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

export default AddBooking;
