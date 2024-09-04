import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
import './style.css'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";


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
    blId: string;
    bl_file: string;
  }

const EditBooking = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const [response, setResponse] = useState<ResponseItem>({});
    const [cordaFonte, setcordaFonte] = useState('');
    const [tipodaFonte, settipodaFonte] = useState('');
    const [file, setFile] = useState(null);
    const [fileBl, setFileBl] = useState(null);

    
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

        const dataToSend = { ...extractFormData(), armador: response.armador };


        const formData = new FormData()
        formData.append('armador', response.armador )
        formData.append('id', id )
        formData.append('qtdContainers', document.getElementById('qtdContainers').value )
        formData.append('contractNumber', document.getElementById('contractNumber').value )
        formData.append('bookingOffice', document.getElementById('bookingOffice').value )
        formData.append('shipper', document.getElementById('shipper').value )
        formData.append('forwarder', document.getElementById('forwarder').value )
        formData.append('consignee', document.getElementById('consignee').value )
        formData.append('shipperRefNumber', document.getElementById('shipperRefNumber').value )
        formData.append('forward_ref_number', document.getElementById('forward_ref_number').value )
        formData.append('purchaseOrderNumber', document.getElementById('purchaseOrderNumber').value )
        formData.append('moveType', document.getElementById('moveType').value )
        formData.append('porto_embarque', document.getElementById('POL').value )
        formData.append('porto_descarga', document.getElementById('POD').value )
        formData.append('data_embarque', document.getElementById('data_embarque').value)
        formData.append('data_chegada', document.getElementById('data_chegada').value)
        formData.append('tipo_container', document.getElementById('tipo_container').value )
        formData.append('nomeMercadoria', document.getElementById('nomeMercadoria').value )
        formData.append('paymentChargeType', document.getElementById('paymentChargeType').value )
        formData.append('paymentTerm', document.getElementById('paymentTerm').value )
        formData.append('payer', document.getElementById('payer').value )
        formData.append('paymentLocation', document.getElementById('paymentLocation').value )
        formData.append('customerComment', document.getElementById('customerComment').value )
        formData.append('emailnotifications', document.getElementById('emailnotifications').value )
        formData.append('email', document.getElementById('client').value )
        formData.append('status', document.getElementById('status').value )
        formData.append('bookingNumber', document.getElementById('bookingNumber').value )
        formData.append('oceanFreigth', document.getElementById('oceanFreigth').value )
        formData.append('blId', document.getElementById('blId').value )
        formData.append('file', file )
        formData.append('fileBl', fileBl )
      

        console.log("FILE BOOKING", file)
        console.log("FILE BL", fileBl)

        try {
            if (file || fileBl) {
                // await fetch('http://localhost:3334/upload/bookings', {
                await fetch('https://zarpar-services-3a7856d27138.herokuapp.com/upload/bookings', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            } else {
                api.post('/booking/update', dataToSend)
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            }
            routeChange();
        } catch (error) {
            console.error("Ocorreu um problema ao editar o booking:", error);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileChangeBl = (e) => {
        setFileBl(e.target.files[0]);
    };
    
    const routeChange = () =>{ 
        const path = "/bookings";
        navigate(path);
    }

      const getArmador = (armador) => {
        let nome = "ND"
        if (armador === "1") { nome = "MAERSK" }
        if (armador === "2") { nome = "CGA_CGM" }
        if (armador === "3") { nome = "MSC" }
        if (armador === "4") { nome = "EXALOG" }
        if (armador === "5") { nome = "COSCO" }
        if (armador === "6") { nome = "HAPAG" }
        if (armador === "7") { nome = "ONE" }
        if (armador === "8") { nome = "HMM" }
        
        return nome
      }

    useEffect(() => {
        api.get("booking/edit/"+id).then((response) => {
            setResponse(response.data.list);
        });

    }, []);

    

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="bookings"/>
      <main>
        <HeaderPage nomeOpcao="Booking"/>
        <div className="main-content">

        <form className="form formulario" name="formulario" encType="multipart/form-data"  onSubmit={sendBookingReserva}>
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
                    value={getArmador(response.armador)}
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
                    />
                    <Form.Text id="data_embarque">format(dd/mm/yyyy)</Form.Text>
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
                    value={moment(response.data_chegada).format('DD/MM/YYYY')}
                    aria-disabled="true"
                    />
                    <Form.Text id="data_chegada">format (dd/mm/yyyy)</Form.Text>
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
                    />
                    <Form.Text id="emailnotifications"></Form.Text>
                </div>


            </div><p></p>
            <div className='row'>
                <div className="col-md-2 formLeft">
                    <Form.Label htmlFor="status"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Status </span></Form.Label>
                    <Form.Select id="status" name="status" aria-label="Default select">
                    {["Pending", "Confirmed", "Canceled", "Saved", "Loaded"].map((option) => (
                        <option key={option} value={option} selected={response.status === option}>{option}</option>
                    ))}
                    </Form.Select>
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
                    value={response.oceanFreigth}
                    aria-describedby="oceanFreigth"
                    />
                    <Form.Text id="oceanFreigth"></Form.Text>
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-4 formLeft">
                    <Form.Label  htmlFor="inputBookingFile"> <span className="formLeft" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Booking File</span></Form.Label>
                    <Form.Control
                    type="file"
                    id="inputBookingFile"
                    name="inputBookingFile"
                    aria-required="true"
                    value={response.booking_file}
                    onChange={handleFileChange}
                    aria-describedby="inputBookingFile"
                    />
                    <Form.Text id="inputBookingFile">(somente arquivos .pdf ou images)</Form.Text>
                </div>
                <div className="col-md-4 formLeft">
                    <Form.Label htmlFor="inputBlFile"><span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>B/L</span></Form.Label>
                    <Form.Control
                    type="file"
                    id="inputBlFile"
                    name="inputBlFile"
                    aria-required="true"
                    value={response.bl_file}
                    onChange={handleFileChangeBl}
                    aria-describedby="inputBlFile"
                    />
                    <Form.Text id="inputBlFile">(Somente arquivo .pdf ou images)</Form.Text>
                </div>
            </div>
            <p></p>
            <div className="row">
              <div className="col-md-12">
                &nbsp;&nbsp; 
                <Link to="/bookings"><Button type="submit" className="botao btn-secondary">Voltar</Button></Link>&nbsp;&nbsp;
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

export default EditBooking;
