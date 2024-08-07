import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";



interface ResponseItem {
    order: string;
    email: string;
    booking: string;
    booking_id: string;
    bl_number: string;
    qtdContainers: string;
    tipo_container: string;
    valor: number;
    porto_embarque: string;
    porto_descarga: string;
    data_embarqui: string;
    armador: string;
    navio: string;
    ets: string;
    pol: string;
    pod: string;
    status: string;
  }

const EditBooking = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const [response, setResponse] = useState<ResponseItem>({});
    
    const [cordaFonte, setcordaFonte] = useState('');
    const [tipodaFonte, settipodaFonte] = useState('');

    const sendBookingReserva = async (event) => {

        event.preventDefault()
      
        const dataToSend = {
            ...extractFormData()
        };


        if ((dataToSend.Status!=="Pending") && (!dataToSend.inputBLNumber || dataToSend.inputBLNumber === null || !dataToSend.inputBookingId || !dataToSend.inputBookingId===null)) {
          setcordaFonte("red")
          settipodaFonte("bold")
          alert('Preencha todos os campos obrigatórios')
        } else {
            setcordaFonte("")
            settipodaFonte("")
          try {
            await api.post('/booking/update', dataToSend);
            // await api.post('booking/send_email', dataToSend);
            routeChange();
          } catch (error) {
              console.error("Ocorreu um problema ao editar o booking:", error);
          }
        }
    }


    const routeChange = () =>{ 
        const path = "/bookings";
        navigate(path);
    }
    
    const extractFormData = () => {
        const formElements = document.querySelectorAll('input, select, textarea');
        const formData = {};
        formElements.forEach((element: any) => {
            formData[element.name] = element.value || null;
        });
        return formData;
      };

    useEffect(() => {
        api.get("booking/edit/"+id).then((response) => {
            setResponse(response.data.list);
        });

    });

    

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cotacoes"/>
      <main>
        <HeaderPage nomeOpcao="Booking"/>
        <div className="main-content">

        <form className="form"  onSubmit={sendBookingReserva}>
        <div className="col-md-12">
        <section className="pedido-reserva">
            <div className="topo">
            <h2 className="titulo-secao">Edit Booking</h2>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    <Form.Label htmlFor="Armador">Armador</Form.Label>
                    <Form.Control
                    type="text"
                    id="armador"
                    name="armador"
                    aria-required="true"
                    aria-describedby="armador"
                    value={response.armador}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="Armador"></Form.Text>
                    <Form.Control
                    type="hidden"
                    id="bookingid"
                    name="bookingid"
                    aria-required="true"
                    aria-describedby="bookingid"
                    value={id}
                    hidden="true"
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="bookingid"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="inputContracNumber"> Client </Form.Label>
                    <Form.Control
                    type="text"
                    id="client"
                    name="client"
                    aria-required="true"
                    aria-describedby="client"
                    value={response.embarcador_email}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="client"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="navio">Navio</Form.Label>
                    <Form.Control
                    type="text"
                    id="navio"
                    name="navio"
                    aria-required="true"
                    aria-describedby="navio"
                    value={response.navio}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="navio"></Form.Text>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    <Form.Label htmlFor="ETS">ETS</Form.Label>
                    <Form.Control
                    type="text"
                    id="ETS"
                    name="ETS"
                    aria-required="true"
                    aria-describedby="ETS"
                    value={response.data_embarque}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="ETS"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="POL"> POL </Form.Label>
                    <Form.Control
                    type="text"
                    id="POL"
                    name="POL"
                    aria-required="true"
                    aria-describedby="POL"
                    value={response.porto_embarque}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="POL"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="POD">POD</Form.Label>
                    <Form.Control
                    type="text"
                    id="POD"
                    name="POD"
                    aria-required="true"
                    aria-describedby="POD"
                    value={response.porto_descarga}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="POD"></Form.Text>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    <Form.Label htmlFor="ETS">Quatidade Container</Form.Label>
                    <Form.Control
                    type="text"
                    id="qtdConatainers"
                    name="qtdConatainers"
                    aria-required="true"
                    aria-describedby="ETS"
                    value={response.qtdContainers}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="ETS"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="POL"> Tipo Container </Form.Label>
                    <Form.Control
                    type="text"
                    id="tipo_container"
                    name="tipo_container"
                    aria-required="true"
                    aria-describedby="POL"
                    value={response.tipo_container}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="POL"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="POD">Total Frete</Form.Label>
                    <Form.Control
                    type="text"
                    id="valor"
                    name="valor"
                    aria-required="true"
                    aria-describedby="POD"
                    value={response.valor}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="POD"></Form.Text>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    <Form.Label htmlFor="Status"> Status</Form.Label>
                    <Form.Select id="Status" name="Status" aria-label="Default select">
                    {["Pending", "Confirmed", "Canceled", "Saved", "Loaded"].map((option) => (
                        <option key={option} value={option} selected={response.status === option}>{option}</option>
                    ))}
                    </Form.Select>
                </div>
                <div className="col-md-4">
                    <Form.Label htmlFor="inputBLNumber"><span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>B/L*</span></Form.Label>
                    <Form.Control
                    type="text"
                    id="inputBLNumber"
                    name="inputBLNumber"
                    aria-required="true"
                    value={response.bl_number}
                    aria-describedby="inputBLNumber"
                    />
                    <Form.Text id="inputContracNumber"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="inputBookingId"> <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Booking ID*</span></Form.Label>
                    <Form.Control
                    type="text"
                    id="inputBookingId"
                    name="inputBookingId"
                    aria-required="true"
                    value={response.booking_id}
                    aria-describedby="inputBookingId"
                    />
                    <Form.Text id="inputBookingId"></Form.Text>
                </div>
            </div>
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
