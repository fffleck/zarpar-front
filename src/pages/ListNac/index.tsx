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
  total: string;
  data_embarque: string;
  armador: string;
  Currency: string;
  targetOceanFreight: string;
  valorCotado: string;
  status: string;
}

const ListNac = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseItem[]>([]);

  const sendCotacaoNacAceita = async (quotationId, id) => {
    
    const dataToSend = {
      quotationId,
      id,
    };
    // eslint-disable-next-line no-restricted-globals
    const userConfirmed = confirm('Esta ação esta finalizar esse processo de cotação. Deseja continuar?');

    if (!userConfirmed) {
      console.log('Ação cancelada pelo usuário.');
      return;
    }

    if (validateFormData(dataToSend)) {
      try {
        await api.post('/quotations/finaliza', dataToSend);
        // await api.post('/email/send_quotationnac', dataToSend);
        routeChange();
      } catch (error) {
        console.error("Ocorreu um problema ao editar o booking:", error);
      }
    } else {
      alert('Preencha todos os campos obrigatórios');
    }

  }


  const validateFormData = (data) => {
    return data.someField !== '';
  };

  const classButton = (status) => {
    let classReturn = "";
    if (status.toLowerCase() === "discarted") { classReturn = "btn btn-warning botao" }
    if (status.toLowerCase() === "selected") { classReturn = "btn btn-danger botao" }
    if (status.toLowerCase() === "quoted") { classReturn = "btn btn-success botao" }
    if (status.toLowerCase() === "pending") { classReturn = "btn btn-secondary botao" }

    return classReturn;
  };

  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, textarea, text');
    const formData = {};
    formElements.forEach((element: any) => {
      formData[element.name] = element.value || null;
    });
    return formData;
  };

  const routeChange = () => { 
    navigate("/admin");
  };
  useEffect(() => {
    api.get(`quotations/lists/nac/${id}`).then(resp => {
      setResponse(resp.data.list);
    });
  
  }, [id]);

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="admin" />
      <main>
        <HeaderPage nomeOpcao="Consolidate" />
        <div className="main-content">
          <form className="form">
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="topo">
                  <h2 className="titulo-secao">List Quotations NAC - {id.substring(id.length - 6 )}</h2>
                </div>
                <div className="card center border-ligth" style={{width: "95%", alignContent: "center"}}>
                <div className='card title' style={{width: "100%", background: "#ccc", color: "#009", alignContent: "center"}}><h4>Cotação Solicitada</h4></div>
                   <table className="table table-bordered">
                      <thead>
                        <th>Quotation</th>
                        <th>Armador</th>
                        <th>Data</th>
                        <th>Embarque</th>
                        <th>Destino</th>
                        <th>Qtd </th>
                        <th>Containers</th>
                        <th>Valor NAC</th>
                        <th>Valor Cotado</th>
                        <th>Status</th>
                        <th></th>
                      </thead>
                      <tbody>
                        {response.map((resultado) => (
                            <tr>
                              <td>{resultado.quotationId.substring(resultado.quotationId.length - 6 )}</td>
                              <td>{resultado.armador}</td>
                              <td>{resultado.data_embarque}</td>
                              <td>{resultado.selectPortoEmbarque.split("-")[0]}</td>
                              <td>{resultado.selectPortoDescarga.split("-")[0]}</td>
                              <td>{resultado.qtdContainers}</td>
                              <td>{resultado.tipoContainer}</td>
                              <td>{resultado.targetOceanFreight}</td>
                              <td>{resultado.valorCotado ?? '-'}</td>
                              <td>
                                <span className={classButton(resultado.status)}>
                                  {resultado.status}
                                </span>
                              </td>
                              <td>
                              {resultado.status === "Quoted" ? (         
                                <Button
                                  type="button"
                                  onClick={() => sendCotacaoNacAceita(resultado.quotationId, resultado._id)}
                                  className="botao btn-primary"
                                  title="Accept this quotation"
                                >
                                  <i className="fa fa-check-circle" alt="Aceitar essa cotação" aria-hidden={true}></i>
                                </Button>
                             ) : (
                              <Button type="button" className="botao btn-secondary" title="Ação não disponível">
                                <i className="fa fa-ban" aria-hidden="true"></i>
                              </Button>

                             )}
                             </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Link to="/dashboard">
                      <Button type="button" className="botao btn-primary">Voltar</Button>
                    </Link>
                    &nbsp;&nbsp;
                    {/* <Button type="submit" className="botao btn-danger">Finalizar</Button> */}
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

export default ListNac;
