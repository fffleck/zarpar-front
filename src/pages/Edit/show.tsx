import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form, Modal } from "react-bootstrap";
import './style.css'


interface ResponseItem {
    id: string;
    qtdContainers: string;
    armador: string;
    contractNumber: string;
    bookingOffice: string;
    shipper: string;
    forwarder: string;
    consignee: string;
    shipperRefNumber: string;
    forward_ref_number: string;
    purchaseOrderNumber: string;
    moveType: string;
    porto_embarque: string;
    porto_descarga: string;
    data_embarque: string;
    data_chegada: string;
    tipo_container: string;
    nomeMercadoria: string;
    paymentChargeType: string;
    paymentTerm: string;
    payer: string;
    paymentLocation: string;
    customerComment: string;
    emailnotifications: string;
    email: string;
    status: string;
    created_at: string;
    bookingNumber: string;
    booking_file: string;
    oceanFreigth: string;
    valor: string;
    taxas: [];
    blId: string;
    bl_file: string;
  }

const ShowBooking = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const [response, setResponse] = useState<ResponseItem>({});
    const [cordaFonte, setcordaFonte] = useState('');
    const [tipodaFonte, settipodaFonte] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModal(true);
    };

    const sendBookingReserva = async (event) => {

        event.preventDefault()

        
        const extractFormData = () => {
            const formElements = document.querySelectorAll('input, select, textarea, file, datepicker');
            const formData = {};
            formElements.forEach((element: any) => {
            formData[element.name] = element.value || null;
            });
            return formData;
        };

        const dataToSend = { ...extractFormData(), armador: response.armador, status: 'Pending' };

        try {
            const data = await api.post('/booking/update', dataToSend);

            if (data.data.success === true) {
                handleShowModal("Sucesso", "Booking Confirmado com sucesso!");
                routeChange();
            } else {
                handleShowModal("Erro", "Ocorreu um problema, tente novamente mais tarde!");
            }
        } catch (error) {
            handleShowModal("Erro", "Ocorreu um problema, tente novamente mais tarde!");
        }
    }
 
    const routeChange = () =>{ 
        const path = "/bookings";
        navigate(path);
    }

    useEffect(() => {
        api.get("booking/edit/"+id).then((response) => {
            setResponse(response.data.list);
        });

    }, [id]);

    

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="bookings"/>
      <main>
        <HeaderPage nomeOpcao="Booking"/>
        <div className="main-content">

        <form className="form formulario" name="formulario" encType="multipart/form-data">
        <div className="col-md-12">
        <section className="pedido-reserva">
            <div className="topo">
            <h2 className="titulo-secao">Edit Booking</h2>
            </div><p></p>
            <div className='row'>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="Armador">Armador</Form.Label>
                    <Form.Control
                    type="text"
                    id="armador"
                    name="armador"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="armador"
                    value={response.armador}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="Armador"></Form.Text>
                    <Form.Control
                    type="hidden"
                    id="bookingid"
                    name="bookingid"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="bookingid"
                    value={id}
                    hidden={false}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="bookingid"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="inputContracNumber"> Client </Form.Label>
                    <Form.Control
                    type="text"
                    id="client"
                    name="client"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="client"
                    value={response.email}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="client"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label>Contract Number</Form.Label>
                    <Form.Control
                    type="text"
                    id="contractNumber"
                    name="contractNumber"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="contractNumber"
                    value={response.contractNumber}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="contractNumber"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="bookingoffice">Booking Office</Form.Label>
                    <Form.Control
                    type="text"
                    id="bookingOffice"
                    name="bookingOffice"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="bookingOffice"
                    value={response.bookingOffice}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="bookingOffice"></Form.Text>
                </div>
            </div><p></p>
            <div className='row'>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="shipper">Shipper</Form.Label>
                    <Form.Control
                    type="text"
                    id="shipper"
                    name="shipper"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="shipper"
                    value={response.shipper}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="shipper"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="forwarder">Forwarder</Form.Label>
                    <Form.Control
                    type="text"
                    id="forwarder"
                    name="forwarder"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="forwarder"
                    value={response.forwarder}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="forwarder"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="consignee">Consignee</Form.Label>
                    <Form.Control
                    type="text"
                    id="consignee"
                    name="consignee"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="consignee"
                    value={response.consignee}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="consignee"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="shipperRefNumber">Shipper Reference Number</Form.Label>
                    <Form.Control
                    type="text"
                    id="shipperRefNumber"
                    name="shipperRefNumber"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="shipperRefNumber"
                    value={response.shipperRefNumber}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="shipperRefNumber"></Form.Text>
                </div>
            </div><p></p>
            <div className='row'>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="forward_ref_number">Forwarder Reference Number</Form.Label>
                    <Form.Control
                    type="text"
                    id="forward_ref_number"
                    name="forward_ref_number"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="forward_ref_number"
                    value={response.forward_ref_number}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="forward_ref_number"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="purchaseOrderNumber">Purchase Order Number</Form.Label>
                    <Form.Control
                    type="text"
                    id="purchaseOrderNumber"
                    name="purchaseOrderNumber"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="purchaseOrderNumber"
                    value={response.purchaseOrderNumber}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="purchaseOrderNumber"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="moveType">Move Type</Form.Label>
                    <Form.Control
                    type="text"
                    id="moveType"
                    name="moveType"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="moveType"
                    value={response.moveType}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="moveType"></Form.Text>
                </div>
            </div><p></p>
            <div className='row'>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="data_embarque">Early Departure Date</Form.Label>
                    <Form.Control
                    type="text"
                    id="data_embarque"
                    name="data_embarque"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="data_embarque"
                    value={response.data_embarque}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="data_embarque"></Form.Text>
                </div>
                <div className="col-md-3 right">
                    <Form.Label htmlFor="POL"> Place Carrier Receipt </Form.Label>
                    <Form.Control
                    type="text"
                    id="POL"
                    name="POL"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="POL"
                    value={response.porto_embarque}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="POL"></Form.Text>
                </div>
                <div className="col-md-3 right">
                    <Form.Label htmlFor="POD">Place Carrier Delivery</Form.Label>
                    <Form.Control
                    type="text"
                    id="POD"
                    name="POD"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="POD"
                    value={response.porto_descarga}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="POD"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="data_chegada">Latest Delivery Date</Form.Label>
                    <Form.Control
                    type="text"
                    id="data_chegada"
                    name="data_chegada"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="data_chegada"
                    value={response.data_chegada}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="data_chegada"></Form.Text>
                </div>
            </div><p></p>
            <div className='row'>
                <div className="col-md-2 formLeft">
                    <Form.Label htmlFor="qtdContainers">Qtd Container</Form.Label>
                    <Form.Control
                        type="number"
                        id="qtdContainers"
                        name="qtdContainers"
                        aria-required="true"
                        className="selecao"
                        aria-describedby="qtdContainers"
                        value={response.qtdContainers}
                        disabled={true}
                    />
                    <Form.Text id="qtdContainers"></Form.Text>
                </div>
                <div className="col-md-2 right">
                    <Form.Label htmlFor="POL"> Tipo Container </Form.Label>
                    <Form.Control
                    type="text"
                    id="tipo_container"
                    name="tipo_container"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="POL"
                    value={response.tipo_container}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="tipo_container"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="nomeMercadoria">Mercadoria</Form.Label>
                    <Form.Control
                    type="text"
                    id="nomeMercadoria"
                    name="nomeMercadoria"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="nomeMercadoria"
                    value={response.nomeMercadoria}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="nomeMercadoria"></Form.Text>
                </div>
                <div className="col-md-3 right">
                    <Form.Label htmlFor="payer">Payer</Form.Label>
                    <Form.Control
                    type="text"
                    id="payer"
                    name="payer"
                    aria-required="true"
                    className="selecao"
                    aria-describedby="payer"
                    value={response.payer}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="payer"></Form.Text>
                </div>
                <div className="col-md-2 formLeft">
                    <Form.Label htmlFor="paymentTerm">Payment Term</Form.Label>
                    <Form.Control
                        type="text"
                        id="paymentTerm"
                        name="paymentTerm"
                        aria-required="true"
                        className="selecao"
                        aria-describedby="paymentTerm"
                        value={response.paymentTerm}
                        disabled={true}
                    />
                    <Form.Text id="paymentTerm"></Form.Text>
                </div>
            </div><p></p>
            <div className='row'>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="paymentChargeType">Payment Charge Type</Form.Label>
                    <Form.Control
                        type="text"
                        id="paymentChargeType"
                        name="paymentChargeType"
                        aria-required="true"
                        className="selecao"
                        aria-describedby="paymentChargeType"
                        value={response.paymentChargeType}
                        disabled={true}
                    />
                    <Form.Text id="paymentChargeType"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="paymentLocation">Payment Location</Form.Label>
                    <Form.Control
                        type="text"
                        id="paymentLocation"
                        name="paymentLocation"
                        aria-required="true"
                        className="selecao"
                        aria-describedby="paymentLocation"
                        value={response.paymentLocation}
                        disabled={true}
                    />
                    <Form.Text id="paymentLocation"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="customerComment">Customer Comments</Form.Label>
                    <Form.Control
                        type="textarea"
                        id="customerComment"
                        name="customerComment"
                        aria-required="true"
                        className="selecao"
                        aria-describedby="customerComment"
                        value={response.customerComment}
                        disabled={true}
                    />
                    <Form.Text id="customerComment"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label htmlFor="emailnotifications">Email Notifications</Form.Label>
                    <Form.Control
                        type="textarea"
                        id="emailnotifications"
                        name="emailnotifications"
                        aria-required="true"
                        className="selecao"
                        aria-describedby="emailnotifications"
                        value={response.emailnotifications}
                        disabled={true}
                    />
                    <Form.Text id="emailnotifications"></Form.Text>
                </div>


            </div><p></p>
            <div className='row'>
                <div className="col-md-2 formLeft">
                    <Form.Label htmlFor="status"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Status </span></Form.Label>
                    <Form.Control
                    type="text"
                    id="status"
                    name="status"
                    aria-required="true"
                    className="selecao"
                    value={response.status}
                    aria-describedby="status"
                    disabled={true}
                    />
                </div>
                <div className="col-md-2 formLeft">
                    <Form.Label  htmlFor="bookingNumber"> <span className="formLeft" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Booking Number</span></Form.Label>
                    <Form.Control
                    type="text"
                    id="bookingNumber"
                    name="bookingNumber"
                    aria-required="true"
                    className="selecao"
                    value={response.bookingNumber}
                    aria-describedby="bookingNumber"
                    disabled={true}
                    />
                    <Form.Text id="bookingNumber"></Form.Text>
                </div>
                <div className="col-md-2 formLeft">
                    <Form.Label  htmlFor="blId"> <span className="formLeft" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>BL ID</span></Form.Label>
                    <Form.Control
                    type="text"
                    id="blId"
                    name="blId"
                    aria-required="true"
                    className="selecao"
                    value={response.blId}
                    aria-describedby="blId"
                    disabled={true}
                    />
                    <Form.Text id="blId"></Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    <Form.Label  htmlFor="oceanFreigth"> <span className="formLeft" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Ocean Freigth</span></Form.Label>
                    <Form.Control
                    type="text"
                    id="oceanFreigth"
                    name="oceanFreigth"
                    className="selecao"
                    aria-required="true"
                    value={"USD " + response.valor}
                    aria-describedby="oceanFreigth"
                    disabled={true}
                    />
                    <Form.Text id="oceanFreigth">+ taxas </Form.Text>
                </div>
                <div className="col-md-3 formLeft">
                    
                    <table className="table" width="90%">
                        <thead>
                            <th colSpan={3}><strong>Taxas</strong></th>
                        </thead>
                        <thead>
                            <th scope="row">Name</th>
                            <th scope="row">Currency</th>
                            <th scope="row">Value</th>
                        </thead>
                        <tbody>
                        {response.taxas?.map((taxa) => (
                            <tr>
                                <td>{taxa.taxname}</td>
                                <td>{taxa.currency}</td>
                                <td>{taxa.taxValue}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <p></p>
            <div className="row">
              <div className="col-md-12">
                &nbsp;&nbsp; 
                <Link to="/bookings"><Button type="button" className="botao btn-secondary">Voltar</Button></Link>&nbsp;&nbsp;
                {((response.status === "Saved")) && (  
                  <Button type="button" className="botao" onClick={sendBookingReserva}>Confirmar</Button>

                )}
              </div>
            </div>
        </section>
        </div>
        </form>
        </div>
      </main> 

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
    
  );
};

export default ShowBooking;
