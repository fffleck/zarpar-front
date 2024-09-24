import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";

interface ResponseItem {
  _id: string;
  quotationId: string;
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
  targetOceanFreight?: string;
  valorCotado?: string;
  Incoterm: string;
}

const ConsolidateBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valorCotado, setValorCotado] = useState('');
  const [response, setResponse] = useState<ResponseItem>({
    _id: '',
    quotationId: '',
    shipper: '',
    consignee: '',
    selectPortoEmbarque: '',
    selectPortoDescarga: '',
    selectMercadoria: '',
    qtdContainers: '',
    tipoContainer: '',
    data_embarque: '',
    armador: '',
    embarcador_email: '',
    embarcador_nome: '',
    Incoterm: '',
  });

  const sendBookingReserva = async (event) => {
    event.preventDefault();

    const dataToSend = { ...extractFormData(), quotationPai: response.quotationId };
    console.log('DATATOSEND', dataToSend);
    // eslint-disable-next-line no-restricted-globals
    const userConfirmed = confirm('Esta ação irá remover esta cotação da lista. Deseja continuar?');

    if (!userConfirmed) {
      console.log('Ação cancelada pelo usuário.');
      return;
    }

    if (validateFormData(dataToSend)) {
      try {
        await api.post('/quotations/update', dataToSend);
        routeChange();
      } catch (error) {
        console.error("Ocorreu um problema ao editar o booking:", error);
      }
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  };

  const routeChange = () => { 
    navigate("/dashboard");
  };

  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, textarea, text, hidden');
    const formData = {};
    formElements.forEach((element: any) => {
      formData[element.name] = element.value || null;
    });
    return formData;
  };

  const validateFormData = (data) => {
    // Adicione sua lógica de validação aqui
    return data.someField !== '';
  };

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await api.get(`quotations/consolida/${id}`);
        setResponse(response.data.list);
      } catch (error) {
        console.error("Erro ao buscar a cotação:", error);
      }
    };

    fetchQuotation();
  }, [id]);

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="admin" />
      <main>
        <HeaderPage nomeOpcao="Consolidate" />
        <div className="main-content">
          <form className="form" onSubmit={sendBookingReserva}>
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="topo">
                  <h2 className="titulo-secao">View Quotation NAC</h2>
                </div>
                <div className='row'>
                  <input type="hidden" name="quotationId" value={response._id} />
                  <FormElement label="Armador" value={response.armador} id="armador"/>
                  <FormElement label="Client" value={response.embarcador_email} id="client" />
                  <FormElement label="Shipper" value={response.shipper} id="Shipper" />
                </div>
                <div className='row'>
                  <FormElement label="ETS" value={response.data_embarque} id="ETS" />
                  <FormElement label="POL" value={response.selectPortoEmbarque} id="POL" />
                  <FormElement label="POD" value={response.selectPortoDescarga} id="POD" />
                </div>
                <div className='row'>
                  <FormElement label="Qtde Cont" value={response.qtdContainers} id="qtdContainers" />
                  <FormElement label="Tipo Container" value={response.tipoContainer} id="tipo_container" />
                  <FormElement label="Incoterm" value={response.Incoterm} id="Incoterm" />
                  <FormElement label="Consignee" value={response.consignee} id="consignee" />
                  <FormElement label="Mercadoria" value={response.selectMercadoria} id="mercadoria" />
                  <FormElementDisabled label="Ocean Freight" value={response.targetOceanFreight} id="targetOceanFreigth"/>
                </div>
                <div className='row'>
                  <div className="col-md-4">
                    <Form.Label htmlFor="Valor">Valor Cotado Armador</Form.Label>
                    <Form.Control
                      type="text"
                      id="valorCotado"
                      name="valorCotado"
                      value={valorCotado}
                      onChange={(e) => setValorCotado(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Link to="/admin">
                      <Button type="button" className="botao btn-info">Voltar</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="submit" className="botao btn-primary">Salvar</Button>
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

const FormElementDisabled = ({ label, value, id }) => (
  <div className="col-md-4">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control type="text" id={id} value={value} aria-disabled="true" disabled={true} />
  </div>
);

const FormElement = ({ label, value, id }) => (
  <div className="col-md-4">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control type="text" id={id} value={value} disabled={false} />
  </div>
); 
export default ConsolidateBooking;
