import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button , Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import Accordion from 'react-bootstrap/Accordion';
import SearchNcm from '../Search/search-ncm';


type informacoesEnviarEmail = {
    armador: string;
    id_armador: string;
    mercadoria: string;
    tipo_mercadoria: string;
    porto_embarque: string;
    porto_descarga: string;
    data_embarque: string;
    tipo_container: string;
    quantidade_containers: number;
    embarcador_nome: string;
    embarcador_email: string;
    embarcador_endereco: string;
    embarcador_cnpj: string;
    embarcador_telefone: string;
    valor: number;
    taxas: any
}

const InfoPedido = (props) => {
const [formData] = useState<Dayjs | null>(null);
const [qtdContainers, setQtdContainers] = useState<number>(1);
const [nomeEmbarcador, setNomeEmbarcador] = useState('');
const [enderecoEmbarcador, setEnderecoEmbarcador] = useState('');
const [cnpjEmbarcador, setCnpjEmbarcador] = useState('');
const [telefoneEmbarcador, setTelefoneEmbarcador] = useState('');
const [mercadoria] = useState('');
const [tipoMercadoria] = useState('');
const [cordaFonte, setcordaFonte] = useState('');
const [tipodaFonte, settipodaFonte] = useState('');
const email = sessionStorage.getItem("user_email");
const [taxs, setTaxs] = useState([]);

let navigate = useNavigate();

let dadosPedido = {
  ...props,
  moeda: props.frete.split[0], //simbolo moeda
  terminal_embarque: "",
  transbordo: "",
  quantidade_containers: qtdContainers,
  embarcador_email: email,
  embarcador_nome: nomeEmbarcador,
  embarcador_endereco: enderecoEmbarcador,
  embarcador_cnpj: cnpjEmbarcador,
  embarcador_telefone: telefoneEmbarcador,
  frete_base: Number(props.frete_base) * qtdContainers,
  frete_bunker: Number(props.frete_bunker) * qtdContainers,
  frete_isps: Number(props.frete_isps) * qtdContainers,
  valor: Number(props.frete) * qtdContainers,
  taxas: taxs,
  mercadoria: mercadoria,
  tipo_mercadoria: tipoMercadoria,
};

const routeChange = () =>{ 
  const path = "/pedido_resultado";
  navigate(path);
}


function handleInputContainers(event: ChangeEvent<HTMLInputElement>){
  const quantidade = Number(event.target.value);
  
  setQtdContainers(quantidade);
}

useEffect(() => {
  api.post('/booking/taxes', {props})
  .then(response=>{
    setTaxs(response.data.list)
  }).catch(err =>{
    console.error(err);
  })

  api.post('/user/find_user', {email})
  .then(resp=>{
    setNomeEmbarcador(resp.data.user.name);
    setEnderecoEmbarcador(resp.data.user.address);
    setCnpjEmbarcador(resp.data.user.cnpj);
    setTelefoneEmbarcador(resp.data.user.telefone);
  })
  .catch(err =>{
    console.error(err);
  })
}, []);


var precoTotal = dadosPedido.valor; 
var precoPorBase = dadosPedido.frete_base;
var precoPorBuner = dadosPedido.frete_bunker;
var precoPorIsps = dadosPedido.frete_isps;
var precoTotalTaxas = 0;

const informacoesEnviarEmail:informacoesEnviarEmail = {
  armador: props.armador,
  id_armador: props.id_armador,
  mercadoria: mercadoria,
  tipo_mercadoria: tipoMercadoria,
  porto_embarque: props.porto_embarque,
  porto_descarga: props.porto_descarga,
  data_embarque: props.data_embarque,
  tipo_container: props.tipo_container,
  quantidade_containers: Number(qtdContainers),
  embarcador_nome: nomeEmbarcador,
  embarcador_email: email,
  embarcador_cnpj: cnpjEmbarcador,
  embarcador_telefone: telefoneEmbarcador,
  embarcador_endereco: enderecoEmbarcador,
  valor: (precoPorBase + precoPorBuner + precoPorIsps),
  taxas: taxs,
  
}

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const sendEmailAnalisys = async (event) => {
  event.preventDefault();

  await api.post('/email/send_analysis', informacoesEnviarEmail)
  .then((res) => {
    console.log("Enviado para análise");
  })
  .catch(err => {
    console.log("Ocorreu um problema ao enviar e-mail para análise");
  })
}

const sendEmailClient = async (event) => {
  event.preventDefault();

  await api.post('/email/send_client', informacoesEnviarEmail)
  .then((res) => {
    console.log("Enviado para cliente");
  })
  .catch(err => {
    console.log("Ocorreu um problema ao enviar e-mail para o cliente");
  })
}

const saveBooking = async (event) => {
  event.preventDefault();
  await api.post('/booking/save_booking', informacoesEnviarEmail)
  .then((res) => {
    console.log("Booking salvo");
  })
  .catch(err => {
    console.log("Ocorreu um problema ao salvar o booking no banco de dados");
  })
}

const sendBookingReserva = async (event) => {

  event.preventDefault()

  const dataToSend = {
      ...dadosPedido,
      formData: formData?.format('YYYY-MM-DD') ?? null,
      qtdContainers,
      mercadoria,
      tipoMercadoria,
      ...extractFormData()
  };

  if (!dataToSend.selectMercadoria || !dataToSend.inputContracNumber || !dataToSend.selectPaymentChargeType || !dataToSend.selectPaymentTerm || !dataToSend.selectPayer) {
    setcordaFonte("red")
    settipodaFonte("bold")
    alert('Preencha todos os campos obrigatórios')
  } else {
    try {
      await api.post('/booking/reservas', dataToSend);
      await api.post('booking/send_email', dataToSend);
      sendEmailAnalisys(event);
      sendEmailClient(event);
      saveBooking(event);
      routeChange();
    } catch (error) {
        console.error("Ocorreu um problema ao reservar o booking:", error);
    }
  }
}

const onSaveBooking = async (event) => {
  event.preventDefault()

  const dataToSend = {
      ...dadosPedido,
      formData: formData?.format('YYYY-MM-DD') ?? null,
      qtdContainers,
      mercadoria,
      tipoMercadoria,
      ...extractFormData()
  };

  if (!dataToSend.selectMercadoria || !dataToSend.inputContracNumber || !dataToSend.selectPaymentChargeType || !dataToSend.selectPaymentTerm || !dataToSend.selectPayer) {
    setcordaFonte("red")
    settipodaFonte("bold")
    alert('Preencha todos os campos obrigatórios')
  } else {
    try {
      await api.post('/booking/reservas', dataToSend);
      saveBooking(event);
      routeChange();
    } catch (error) {
        console.error("Ocorreu um problema ao salvar o booking:", error);
    }
  }
}

const extractFormData = () => {
  const formElements = document.querySelectorAll('input, select, textarea');
  const formData = {};
  formElements.forEach((element: any) => {
      formData[element.name] = element.value || null;
  });
  return formData;
};


return (  
  <form className="form"  onSubmit={sendBookingReserva}>
    <div className="col-md-9">
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
                        <Form.Select id="selectCarrier" name='selectCarrier' aria-label="Default select example" disabled>
                          <option>Select ...</option>
                          <option value={dadosPedido.armador} selected>{dadosPedido.armador}</option>
                        </Form.Select>
                        </div>
                        <div className="col-md-4">
                        <Form.Label htmlFor="inputContracNumber"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Contract Number*</span> </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputContracNumber"
                          name="inputContracNumber"
                          aria-required="true"
                          aria-describedby="inputContracNumber"
                        />
                        <Form.Text id="inputContracNumber"></Form.Text>
                        </div>
                        <div className="col-md-4 right">
                        <Form.Label htmlFor="inputContracNumber"> Booking Office </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputBookingOffice"
                          name="inputBookingOffice"
                          aria-required="true"
                          aria-describedby="inputBookingOffice"
                        />
                        <Form.Text id="inputBookingOffice"></Form.Text>
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
                      <Form.Label htmlFor="inputShipper"> Shipper </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputShipper"
                          name="inputShipper"
                          aria-required="true"
                          aria-describedby="inputShipper"
                          disabled="true"
                          value={dadosPedido.embarcador_nome}
                        />
                        <Form.Text id="inputShipper"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="inputForwarder"> Forwarder </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputForwarder"
                          name="inputForwarder"
                          aria-required="true"
                          aria-describedby="inputForwarder"
                          disabled="true"
                          value={"Zarpar Trade"}
                        />
                        <Form.Text id="inputForwarder"></Form.Text>
                      </div>

                      <div className="col-md-4">

                      <Form.Label htmlFor="inputConsignee"> Consignee </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputConsignee"
                          name="inputConsignee"
                          aria-required="true"
                          aria-describedby="inputConsignee"
                        />
                        <Form.Text id="inputConsignee"></Form.Text>
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
                      <Form.Label htmlFor="inputshipperRefNumber"> Shipper Reference Number </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputshipperRefNumber"
                          name="inputshipperRefNumber"
                          aria-required="true"
                          aria-describedby="inputshipperRefNumber"
                        />
                        <Form.Text id="inputshipperRefNumber"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="inputforwardRefNumber"> Forwarder's Reference Number </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputforwardRefNumber"
                          name="inputforwardRefNumber"
                          aria-required="true"
                          aria-describedby="inputforwardRefNumber"
                        />
                        <Form.Text id="inputforwardRefNumber"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="inputpurchaseOrderNumber">Purchase Order Number</Form.Label>
                        <Form.Control
                          type="text"
                          id="inputpurchaseOrderNumber"
                          name="inputpurchaseOrderNumber"
                          aria-required="true"
                          aria-describedby="inputpurchaseOrderNumber"
                        />
                        <Form.Text id="inputpurchaseOrderNumber"></Form.Text>
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
                      <Form.Label htmlFor="selectMoveType"> Move Type</Form.Label>
                        <Form.Select id="selectMoveType" name="selectMoveType" aria-label="Default select">
                          <option value="PortToPort" selected>Port, Ramp, or CY to Port, Ramp, or CY</option>
                          <option value="DoorToPort">Door to port, Ramp, or Cy </option>
                          <option value="DoorToDoor">Door to Door</option>
                          <option value="PortToDoor">Port Ramp, or Cy to Door</option>
                        </Form.Select>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="inputplacecarrierreceipt"> Place of Carrier Receipt </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputplacecarrierreceipt"
                          name="inputplacecarrierreceipt"
                          value={props.porto_embarque}
                          aria-required="true"
                          disabled
                          aria-describedby="inputplacecarrierreceipt"
                        />
                        <Form.Text id="inputplacecarrierreceipt"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="inputplacecarrierreceipt"> Early Departure Date </Form.Label>
                        <Form.Control
                          type="text"
                          id="dateDepartureEarly"
                          name="dateDepartureEarly"
                          value={formataData(props.data_embarque)}
                          aria-required="true"
                          disabled
                          aria-describedby="inputplacecarrierreceipt"
                        />
                        <Form.Text id="inputplacecarrierreceipt"></Form.Text>
                      </div>
                  </div>
                  <p></p>
                  <div className='row'>
                      <div className="col-md-4">
                      </div>
                      <div className="col-md-4">
                      <Form.Label htmlFor="inputplacecarrierreceipt"> Place of Carrier Delivery</Form.Label>
                        <Form.Control
                          type="text"
                          id="inputplacecarrierreceipt"
                          name="inputplacecarrierreceipt"
                          value={props.porto_descarga}
                          aria-required="true"
                          disabled
                          aria-describedby="inputplacecarrierreceipt"
                        />
                        <Form.Text id="inputplacecarrierreceipt"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="inputplacecarrierreceipt"> Latest Delivery Date </Form.Label>
                        <Form.Control
                          type="text"
                          id="dateDeliveryLatest"
                          name="dateDeliveryLatest"
                          value={formataData(props.data_chegada)}
                          aria-required="true"
                          disabled
                          aria-describedby="inputplacecarrierreceipt"
                        />
                        <Form.Text id="inputplacecarrierreceipt"></Form.Text>
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
                        <input type="number" name='qtdContainers' min={1} value={dadosPedido.quantidade_containers} onChange={handleInputContainers} className="espacamento"/>
                      </div>
                      <div className="col-md-1">
                      </div>
                      <div className="col-md-7">
                        <p className="item-ajuste__titulo">Tipo de Container</p>
                        <input type="text" name='typeContainer' value={dadosPedido.tipo_container} disabled className="espacamento"/>
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
                        <Form.Label htmlFor="selectPaymentChargeType"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Charge Type* </span></Form.Label>
                        <Form.Select id="selectPaymentChargeType"  name="selectPaymentChargeType" aria-label="Default select example">
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
                        <Form.Label htmlFor="selectPaymentTerm">  <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Payment Term* </span></Form.Label>
                        <Form.Select id="selectPaymentTerm" name="selectPaymentTerm" aria-label="Default select example">
                          <option>Select ...</option>
                          <option value="Prepaid">Pre-paid</option>
                          <option value="Collect">Collect</option>
                          <option value="PayableElsehere">Payable Elsewhere</option>
                        </Form.Select>
                      </div>

                      <div className="col-md-3">
                        <Form.Label htmlFor="selectPayer"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Payer* </span> </Form.Label>
                        <Form.Select id="selectPayer" name="selectPayer" aria-label="Default select example">
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
                      <Form.Label htmlFor="inputPaymentLocation"> Payment Location </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputPaymentLocation"
                          name="inputPaymentLocation"
                          aria-required="true"
                          aria-describedby="inputPaymentLocation"
                        />
                        <Form.Text id="inputPaymentLocation"></Form.Text>
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
                      <Form.Label htmlFor="inputCustomerComment"> Customer Comments </Form.Label>
                        <Form.Control
                          as="textarea"
                          id="inputCustomerComment"
                          name="textAreaCustomerComment"
                          rows={3}
                          aria-describedby="inputCustomerComment"
                        />

                      </div>

                      <div className="col-md-12">
                      <Form.Label htmlFor="inputPartnerEmailNotifications"> Partner Email Notifications </Form.Label>
                        <Form.Control
                          type="email"
                          id="inputPartnerEmailNotifications"
                          name="inputPartnerEmailNotifications"
                          aria-describedby="inputCustomerComment"
                        />
                      </div>
                    </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> 
            <div className="row">
              <div className="col-md-6">
                <Button type="button" onClick={onSaveBooking} className="btn btn-secondary botao">Salvar</Button>
              </div>
              <div className="col-md-6">
                <Button type="submit" className="botao">Reservar</Button>
              </div>
            </div>
      </section>
    </div>
    <div className="col-md-3">
      <section className="pedido-reserva" style={{"textAlign": "right"}}>
          <div className="topo" >
            <h2 className="titulo-secao" >Dados Taxas</h2>
            </div>
            <hr></hr>
            <div style={{"textAlign": "center"}}>
              <h2 className="titulo-secao">Taxas por Container</h2>
            </div>
            <table className='table'>
              <tr>
                <td><p className="item-ajuste__titulo">Tipo do Container </p></td>
                <td style={{"textAlign": "right"}}><strong>{(dadosPedido.tipo_container)}  x ({qtdContainers}) </strong></td>
              </tr>
              <tr>
                <td><p className="item-ajuste__titulo">Base Freight </p></td>
                <td style={{"textAlign": "right"}}><strong> {USDollar.format( precoPorBase)}</strong></td>
              </tr>
              <tr>
                <td><p className="item-ajuste__titulo">Fee / Bunker </p></td>
                <td style={{"textAlign": "right"}}><strong> {USDollar.format(precoPorBuner)}</strong></td>
              </tr>
              <tr>
                <td> <p className="item-ajuste__titulo">Fee / ISPS </p></td>
                <td style={{"textAlign": "right"}}><strong> {USDollar.format(precoPorIsps)}</strong></td>
              </tr>
            </table>
            <hr></hr>
            <div style={{"textAlign": "center"}}>
              <h2 className="titulo-secao">Taxas de Embarque</h2> 
            </div>
            <table className='table'>
                {taxs.map(tax => {
                  precoTotalTaxas =+ precoTotalTaxas + (tax.taxValue * qtdContainers) 
                  return (                 
                        <tr key={tax.taxname}>
                            <td><p className="item-ajuste__titulo">{tax.taxname}</p></td>
                            <td style={{"textAlign": "right"}}><strong> {(tax.taxValue * qtdContainers)}</strong> {tax.currency}</td>
                        </tr>
                    )})}
            </table>
            <hr></hr>
            <div style={{"textAlign": "center"}}>
              <h2 className="titulo-secao">Dados da reserva</h2> 
            </div>
            <div style={{"textAlign": "left"}}>
              <table>
                <tr>
                <td style={{textAlign: "left"}}>Porto Embarque</td>
                  <td style={{textAlign: "right"}}><input type="text" value={dadosPedido.porto_embarque} disabled style={{textAlign: "right"}}/></td>
                </tr>
                <tr>
                <td style={{textAlign: "left"}}>Porto Descarga</td>
                  <td style={{textAlign: "right"}}><input type="text" value={dadosPedido.porto_descarga} disabled style={{textAlign: "right", width: "200px"}} className="espacamento"/></td>
                </tr>
                <tr>
                <td style={{textAlign: "left"}}>Armador</td>
                  <td style={{textAlign: "right"}}><input type="text" value={dadosPedido.armador} disabled style={{textAlign: "right"}} className="espacamento"/></td>
                </tr>
                <tr>
                <td style={{textAlign: "left"}}>Data de Embarque</td>
                  <td style={{textAlign: "right"}}><input type="text" value={dadosPedido.data_embarque} disabled style={{textAlign: "right"}} className="espacamento"/></td>
                </tr>
              </table>
            </div>
      </section>
      <section className="pedido-reserva">
          <div style={{"textAlign": "center"}}>
            <h2 className="valor-frete">Total Frete a Pagar</h2> 
          </div>

          <div style={{"textAlign": "center"}}>
            <p className="preco">{`${USDollar.format(dadosPedido.frete_base + dadosPedido.frete_bunker + dadosPedido.frete_isps )}`}</p>
            <span className='item-ajuste__titulo' style={{"textAlign": "center"}}> (+ taxas)</span>
          </div>
          <div style={{"textAlign": "center"}}>
            <Button type="submit" className="botao">Reservar</Button>
          </div>
      </section>
    </div>
  </form>
)
}

function formataData(date: string) {
  let dateDate = date.split("/");
  return (dateDate[0].length >= 2 ? dateDate[0] : '0'+ dateDate[0]) +'/'+dateDate[1]+'/'+dateDate[2];
} 

export default InfoPedido;

function async(event: Event) {
  throw new Error('Function not implemented.');
}
