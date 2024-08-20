import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";

interface ResponseItem {
  _id: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  qtdContainers: string;
  tipoContainer: string;
  data_embarque: string;
  armador: string;
  Currency: string;
  targetOceanFreight: string;
  status: string;
}

const ConsolidaNac = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseItem>({
    _id: '',
  shipper: '',
  consignee: '',
  selectPortoEmbarque: '',
  selectPortoDescarga: '',
  selectMercadoria: '',
  qtdContainers: '',
  tipoContainer: '',
  data_embarque: '',
  armador: '',
  Currency: '',
  targetOceanFreight: '',
  status: '',
  });

  const sendBookingReserva = async (event) => {
    event.preventDefault();

    const dataToSend = { ...extractFormData() };
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
    navigate("/admin");
  };

  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, textarea');
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
                  <h2 className="titulo-secao">Position NAC - {response._id}</h2>
                </div>
                <div className="card center border-ligth" style={{width: "95%", alignContent: "center"}}>
                <div className='card title' style={{width: "100%", background: "#ccc", color: "#009", alignContent: "center"}}><h4>Cotação Solicitada</h4></div>
                    {/* <table className="table table-bordered">
                      <thead>
                        <th>Armador</th>
                        <th>Data</th>
                        <th>Embarque</th>
                        <th>Destino</th>
                        <th>Qtd </th>
                        <th>Containers</th>
                        <th>Valor Cotado</th>
                        <th></th>
                      </thead>
                      <tbody>
                        <td>{response.armador}</td>
                        <td>{response.data_embarque}</td>
                        <td>{response.selectPortoEmbarque.split("-")[0]}</td>
                        <td>{response.selectPortoDescarga.split("-")[0]}</td>
                        <td>{response.qtdContainers}</td>
                        <td>{response.tipoContainer}</td>
                        <td>{response.targetOceanFreight}</td>
                      </tbody>
                    </table> */}
                <div className='row'>
                  <input type="hidden" name="quotationId" value={response._id} />
                  <FormElement label="Armador" value={response.armador} id="armador"/>
                  <FormElement label="Shipper" value={response.shipper} id="Shipper" />
                  <FormElement label="ETS" value={response.data_embarque} id="ETS" />
                  <FormElement label="POL" value={response.selectPortoEmbarque} id="POL" />
                  <FormElement label="POD" value={response.selectPortoDescarga} id="POD" />
                  <FormElement type="number" label="Qtde Cont" value={response.qtdContainers} id="qtdContainers" />
                  <FormElement label="Tipo Container" value={response.tipoContainer} id="tipo_container" />
                  <FormElement label="Incoterm" value={response.Incoterm} id="Incoterm" />
                  <FormElement label="Consignee" value={response.consignee} id="consignee" />
                  <FormElement label="Mercadoria" value={response.selectMercadoria} id="mercadoria" />
                  <FormElement label="Currency" value={response.Currency} id="Currenci" />
                  <FormElement label="Freigth" value={response.targetOceanFreight} id="targetOceanFreight" />
                </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Link to="/admin">
                      <Button type="button" className="botao btn-primary">Voltar</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="submit" className="botao btn-danger">Finalizar</Button>
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

const FormElement = ({ label, value, id }) => (
  <div className="col-md-4">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control type="text" id={id} value={value} aria-disabled="true" disabled={true} />
  </div>
);

export default ConsolidaNac;
