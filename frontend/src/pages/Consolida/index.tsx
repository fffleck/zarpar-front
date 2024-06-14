import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";



interface ResponseItem {
  id: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  qtdContainers: string;
  tipoContainer: string;
  data_embarque: string;
  armador: string;
  embarcador_email: string;
  embarcador_nome: string;
  Incoterm: string;
}

const ConsolidateBooking = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const [response, setResponse] = useState<ResponseItem>({});
    
    const sendBookingReserva = async (event) => {

        event.preventDefault()
      
        const dataToSend = {
            ...extractFormData()
        };

        console.log('DATA', dataToSend);

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
        api.get("quotations/consolida/"+id).then((response) => {
          console.log('RESPONSE', response);
            setResponse(response.data.list);
        });

    }, []);

    

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="admin"/>
      <main>
        <HeaderPage nomeOpcao="Consolidate"/>
        <div className="main-content">

        <form className="form"  onSubmit={sendBookingReserva}>
        <div className="col-md-12">
        <section className="pedido-reserva">
            <div className="topo">
            <h2 className="titulo-secao">View Quotation NAC</h2>
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
                    disabled={true}
                    />
                    <Form.Text id="Armador"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="Client"> Client </Form.Label>
                    <Form.Control
                    type="text"
                    id="client"
                    name="client"
                    aria-required="true"
                    aria-describedby="client"
                    value={response.embarcador_email}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="client"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="Shipper">Shipper</Form.Label>
                    <Form.Control
                    type="text"
                    id="Shipper"
                    name="Shipper"
                    aria-required="true"
                    aria-describedby="Shipper"
                    value={response.shipper}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="Shipper"></Form.Text>
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
                    disabled={true}
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
                    value={response.selectPortoEmbarque}
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
                    value={response.selectPortoDescarga}
                    aria-disabled="true"
                    disabled="true"
                    />
                    <Form.Text id="POD"></Form.Text>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-1">
                    <Form.Label htmlFor="qtdContainer">Qtde Cont</Form.Label>
                    <Form.Control
                    type="text"
                    id="qtdConatainers"
                    name="qtdConatainers"
                    aria-required="true"
                    aria-describedby="qtdContainer"
                    value={response.qtdContainers}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="qtdContainer"></Form.Text>
                </div>
                <div className="col-md-2 right">
                    <Form.Label htmlFor="tipo_container"> Tipo Container </Form.Label>
                    <Form.Control
                    type="text"
                    id="tipo_container"
                    name="tipo_container"
                    aria-required="true"
                    aria-describedby="tipo_container"
                    value={response.tipoContainer}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="tipo_container"></Form.Text>
                </div>
                <div className="col-md-1">
                    <Form.Label htmlFor="Incoterm">Incoterm</Form.Label>
                    <Form.Control
                    type="text"
                    id="Incoterm"
                    name="Incoterm"
                    aria-required="true"
                    aria-describedby="Incoterm"
                    value={response.Incoterm}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="Incoterm"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="Consignee">Consignee</Form.Label>
                    <Form.Control
                    type="text"
                    id="valor"
                    name="valor"
                    aria-required="true"
                    aria-describedby="Consignee"
                    value={response.consignee}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="Consignee"></Form.Text>
                </div>
                <div className="col-md-4 right">
                    <Form.Label htmlFor="mercadoria">Mercadoria</Form.Label>
                    <Form.Control
                    type="text"
                    id="valor"
                    name="valor"
                    aria-required="true"
                    aria-describedby="Mercadoria"
                    value={response.selectMercadoria}
                    aria-disabled="true"
                    disabled={true}
                    />
                    <Form.Text id="Mercadoria"></Form.Text>
                </div>
            </div>
            <div className='row'>
              <div className="col-md-2 right">
                  <Form.Label htmlFor="shipper">Shipper</Form.Label>
                  <Form.Control
                  type="text"
                  id="shipper"
                  name="shipper"
                  aria-required="true"
                  aria-describedby="shipper"
                  value={response.shipper}
                  aria-disabled="true"
                  disabled={true}
                  />
                  <Form.Text id="shipper"></Form.Text>
              </div>
              <div className="col-md-2 right">
                  <Form.Label htmlFor="Consignee">Consignee</Form.Label>
                  <Form.Control
                  type="text"
                  id="Consignee"
                  name="Consignee"
                  aria-required="true"
                  aria-describedby="Consignee"
                  value={response.consignee}
                  aria-disabled="true"
                  disabled={true}
                  />
                  <Form.Text id="consignee"></Form.Text>
              </div>
              <div className="col-md-2 right">
                  <Form.Label htmlFor="targetOceanFreight">Target Ocean Freight </Form.Label>
                  <Form.Control
                  type="text"
                  id="targetOceanFreight"
                  name="targetOceanFreight"
                  aria-required="true"
                  aria-describedby="Consignee"
                  value={response.targetOceanFreight}
                  aria-disabled="true"
                  disabled={true}
                  />
                  <Form.Text id="targetOceanFreight"></Form.Text>
              </div>
              <div className="col-md-2 right">
                  <Form.Label htmlFor="CargaEspecial">Carga Especial </Form.Label>
                  <Form.Control
                  type="text"
                  id="CargaEspecial"
                  name="CargaEspecial"
                  aria-required="true"
                  aria-describedby="Consignee"
                  value={response.CargaEspecial}
                  aria-disabled="true"
                  disabled={true}
                  />
                  <Form.Text id="CargaEspecial"></Form.Text>
              </div>
              <div className="col-md-2 right">
                  <Form.Label htmlFor="freetimeOrigem">Free Time Origen</Form.Label>
                  <Form.Control
                  type="text"
                  id="freetimeOrigem"
                  name="freetimeOrigem"
                  aria-required="true"
                  aria-describedby="Consignee"
                  value={response.freetimeOrigem}
                  aria-disabled="true"
                  disabled={true}
                  />
                  <Form.Text id="freetimeOrigem"></Form.Text>
              </div>
              <div className="col-md-2 right">
                  <Form.Label htmlFor="freetimeDestino">Free Time Destino</Form.Label>
                  <Form.Control
                  type="text"
                  id="freetimeDestino"
                  name="freetimeDestino"
                  aria-required="true"
                  aria-describedby="Consignee"
                  value={response.freetimeDestino}
                  aria-disabled="true"
                  disabled={true}
                  />
                  <Form.Text id="freetimeDestino"></Form.Text>
              </div>

            </div>
            <div className="row">
              <div className="col-md-12">
                &nbsp;&nbsp; 
                <Link to="/admin"><Button type="submit" className="botao btn-primary">Voltar</Button></Link>
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

export default ConsolidateBooking;
