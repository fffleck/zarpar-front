import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button , Form, Modal } from 'react-bootstrap';
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
const [empresaEmbarcador, setEmpresaEmbarcador] = useState('');
const [enderecoEmbarcador, setEnderecoEmbarcador] = useState('');
const [cnpjEmbarcador, setCnpjEmbarcador] = useState('');
const [telefoneEmbarcador, setTelefoneEmbarcador] = useState('');
const [mercadoria] = useState('');
const [tipoMercadoria, setTipoMercadoria] = useState('');
const [cordaFonte, setcordaFonte] = useState('');
const [tipodaFonte, settipodaFonte] = useState('');
const email = sessionStorage.getItem("user_email");
const [taxs, setTaxs] = useState([]);
const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState("");
const [modalTitle, setModalTitle] = useState("");

const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

let navigate = useNavigate();

let dadosPedido = {
  ...props,
  moeda: props.frete.split[0], //simbolo moeda
  terminal_embarque: "",
  transbordo: "",
  quantidade_containers: qtdContainers,
  embarcador_email: email,
  embarcador_nome: nomeEmbarcador,
  embarcador_empresa: empresaEmbarcador ?? null,
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

const routeBack = () =>{ 
  const path = "/cotacoes";
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
    setEmpresaEmbarcador(resp.data.user.enterpriseName)
    setEnderecoEmbarcador(resp.data.user.address);
    setCnpjEmbarcador(resp.data.user.cnpj);
    setTelefoneEmbarcador(resp.data.user.telefone);
  })
  .catch(err =>{
    console.error(err);
  })
}, [email, props]);


const precoPorBase = dadosPedido.frete_base;
const precoPorBuner = dadosPedido.frete_bunker;
const precoPorIsps = dadosPedido.frete_isps;
let precoTotalTaxas = 0;

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

const handleSave = async (event) => {
  event.preventDefault()
  const dataToSend = {
    ...dadosPedido,
    status: 'Saved',
    formData: formData?.format('YYYY-MM-DD') ?? null,
    qtdContainers,
    mercadoria,
    tipoMercadoria,
    ...extractFormData()
  }

  if (!dataToSend.nomeMercadoria || !dataToSend.paymentChargeType || !dataToSend.paymentTerm || !dataToSend.payer) {
    setcordaFonte("red")
    settipodaFonte("bold")
    alert('Preencha todos os campos obrigatórios')
  } else {
    setTipoMercadoria(dataToSend.nomeMercadoria)
    
    try {
      await api.post('/booking/save_booking', dataToSend);
      handleShowModal("Sucesso", `Seu registro ficará Salvo por 24 horas, caso não seja confirmado dentro desse prazo. Será cancelado automaticamente pelo sistema`);
      routeChange();
    } catch (error) {
        console.error("Ocorreu um problema ao salvar o booking:", error);
    }
  }
};

const handleConfirm = async (event) => {
  event.preventDefault()

  const dataToSend = {
      ...dadosPedido,
      status: 'Pending',
      formData: formData?.format('YYYY-MM-DD') ?? null,
      qtdContainers,
      mercadoria,
      tipoMercadoria,
      ...extractFormData()
  };

  if (!dataToSend.nomeMercadoria || !dataToSend.contractNumber || !dataToSend.paymentChargeType || !dataToSend.paymentTerm || !dataToSend.payer) {
    setcordaFonte("red")
    settipodaFonte("bold")
    alert('Preencha todos os campos obrigatórios')
  } else {
    setTipoMercadoria(dataToSend.nomeMercadoria)
    try {
      await api.post('/booking/save_booking', dataToSend);
      await api.post('booking/send_email', dataToSend);
      sendEmailAnalisys(event);
      sendEmailClient(event);
      routeChange();
    } catch (error) {
        console.error("Ocorreu um problema ao reservar o booking:", error);
    }
  }
};

const extractFormData = () => {
  const formElements = document.querySelectorAll('input, select, textarea, text');
  const formData = {};
  formElements.forEach((element: any) => {
      formData[element.name] = element.value || null;
  });
  return formData;
};

return ( 
  <div className='flex-dashboard'>
  <form className="form">
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
                        <Form.Label htmlFor="carrier"> Carrier / NVOCC / Booking Agent </Form.Label>
                        <Form.Select id="carrier" name='carrier' aria-label="Default select example" disabled>
                          <option>Select ...</option>
                          <option value={dadosPedido.armador} selected>{dadosPedido.armador}</option>
                        </Form.Select>
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
                          disabled="true"
                          value={dadosPedido.embarcador_empresa}
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
                      <Form.Label htmlFor="placecarrierreceipt"> Place of Carrier Receipt </Form.Label>
                        <Form.Control
                          type="text"
                          id="placecarrierreceipt"
                          name="placecarrierreceipt"
                          value={props.porto_embarque}
                          aria-required="true"
                          disabled
                          aria-describedby="placecarrierreceipt"
                        />
                        <Form.Text id="placecarrierreceipt"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="earlyDepartureDate"> Early Departure Date </Form.Label>
                        <Form.Control
                          type="text"
                          id="dateDepartureEarly"
                          name="dateDepartureEarly"
                          value={formataData(props.data_embarque)}
                          aria-required="true"
                          disabled
                          aria-describedby="earlyDepartureDate"
                        />
                        <Form.Text id="earlyDepartureDate"></Form.Text>
                      </div>
                  </div>
                  <p></p>
                  <div className='row'>
                      <div className="col-md-4">
                      </div>
                      <div className="col-md-4">
                      <Form.Label htmlFor="placeCarrierDelivery"> Place of Carrier Delivery</Form.Label>
                        <Form.Control
                          type="text"
                          id="placeCarrierDelivery"
                          name="placeCarrierDelivery"
                          value={props.porto_descarga}
                          aria-required="true"
                          disabled
                          aria-describedby="placeCarrierDelivery"
                        />
                        <Form.Text id="placeCarrierDelivery"></Form.Text>
                      </div>

                      <div className="col-md-4">
                      <Form.Label htmlFor="latestDeliveryDate"> Latest Delivery Date </Form.Label>
                        <Form.Control
                          type="text"
                          id="dateDeliveryLatest"
                          name="dateDeliveryLatest"
                          value={formataData(props.data_chegada)}
                          aria-required="true"
                          disabled
                          aria-describedby="latestDeliveryDate"
                        />
                        <Form.Text id="latestDeliveryDate"></Form.Text>
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
                      <Form.Label htmlFor="customerComment"> Customer Comments </Form.Label>
                        <Form.Control
                          as="textarea"
                          id="customerComment"
                          name="textAreaCustomerComment"
                          rows={3}
                          aria-describedby="customerComment"
                        />

                      </div>

                      <div className="col-md-12">
                      <Form.Label htmlFor="emailnotifications"> Partner Email Notifications </Form.Label>
                        <Form.Control
                          type="email"
                          id="emailnotifications"
                          name="emailnotifications"
                          aria-describedby="customerComment"
                        />
                      </div>
                    </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> 
            <div className="row">
              <div className="col-md-6">
                <Button type="button" onClick={routeBack} className="btn btn-secondary botao">Voltar</Button>
              </div>
              <div className="col-md-6">
                <Button onClick={handleSave} className="botao">Salvar</Button>
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
              <h2 className="titulo-secao">Ocean Freight</h2>
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
                <td> <p className="item-ajuste__titulo">Fee / CSF </p></td>
                <td style={{"textAlign": "right"}}><strong> {USDollar.format(precoPorIsps)}</strong></td>
              </tr>
            </table>
            <hr></hr>
            <div style={{"textAlign": "center"}}>
              <h2 className="titulo-secao">Taxas Locais</h2> 
            </div>
            <table className='table'>
                {taxs.map(tax => {
                  const valor_taxa = (tax.applicability === "C") ? (tax.taxValue * qtdContainers) : tax.taxValue  
                  precoTotalTaxas =+ precoTotalTaxas +  valor_taxa
                  return (                 
                        <tr key={tax.taxname}>
                            <td><p className="item-ajuste__titulo">{tax.taxname}</p></td>
                            <td style={{"textAlign": "right"}}><strong> { valor_taxa }</strong> {tax.currency}</td>
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
            <Button onClick={handleConfirm} className="botao">Confirmar</Button>
          </div>
      </section>
    </div>
  </form>
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{modalMessage}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
  </div> 
)
}

function formataData(date: string) {
  let dateDate = date.split("/");
  return (dateDate[0].length >= 2 ? dateDate[0] : '0'+ dateDate[0]) +'/'+dateDate[1]+'/'+dateDate[2];
} 

export default InfoPedido;
