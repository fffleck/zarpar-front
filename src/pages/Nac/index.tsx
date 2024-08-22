import React, { useEffect, useState } from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import api from "../../services/api";
import { Autocomplete, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Button, Form } from "react-bootstrap";
import SearchNcm from "./seachArmador/search-ncm"
import SearchArmador from "./seachArmador/search-armador";
import { useNavigate } from "react-router-dom";

interface ItemSelect {
  idItem: any;
  name: string;
}

interface PortoSelect {
  port_id: string;
  port_name: string;
}


const CotacoesNAC = () => {
  const [nomeEmbarcador, setNomeEmbarcador] = useState('');
  const [telefoneEmbarcador, setTelefoneEmbarcador] = useState('');
  const [valuePortoEmbarque, setValuePortoEmbarque] = useState(null);
  const [valuePortoDescarga, setValuePortoDescarga] = useState(null);
  const [inputValuePortoEmbarque, setInputValuePortoEmbarque] = useState("");
  const [inputValuePortoDescarga, setInputValuePortoDescarga] = useState("");
  const [tiposContainer, setTiposContainer] = useState<ItemSelect[]>([]);
  const [portosEmbarque, setPortosEmbarque] = useState<PortoSelect[]>([]);
  const [portosDescarga, setPortosDescarga] = useState<PortoSelect[]>([]);
  const [mercadoria] = useState('');
  const [formData, setFormData] = useState<Dayjs | null>(null);
  const email = sessionStorage.getItem("user_email");
  const [selectedArmadores, setSelectedArmadores] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [cordaFonte, setcordaFonte] = useState('');
  const [tipodaFonte, settipodaFonte] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState('');
  const [selectedIMO, setSelectedIMO] = useState('');



  let navigate = useNavigate();

  const routeChange = () =>{ 
    const path = "/sucesso_quotation";
    navigate(path);
  }

  const routeFornecedor = () =>{ 
    const path = "/fornecedores";
    navigate(path);
  }

  const handleArmadorChange = (event, newValue) => {
    setSelectedArmadores(newValue);
  };

  const handleInputArmadorChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  useEffect(() => {
    api.get("filters/portos_embarque").then((response) => {
      setPortosEmbarque(response.data);
    });

    api.get("filters/portos_descarga").then((response) => {
      setPortosDescarga(response.data);
    });

    api.get("filters/tipos_container").then((response) => {
      setTiposContainer(response.data);
    });

    api
      .post("/user/find_user", { email })
      .then((resp) => {
        setNomeEmbarcador(resp.data.user.name);
        setTelefoneEmbarcador(resp.data.user.telefone);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [email]);

  function handleInputChange(event) {
    setFormData(dayjs(`${event.$y}-${event.$M + 1}-${event.$D}`));
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

  const sendRequestNAC = async (event) => {

    event.preventDefault()
  
    const dataToSend = {
        embarcador_nome: nomeEmbarcador,
        telefone_embarcador: telefoneEmbarcador,
        embarcador_email: email,
        data_embarque: formData?.format('DD-MM-YYYY') ?? null,
        ...extractFormData()
    };

    if (!dataToSend.Armadores || !dataToSend.shipper || !dataToSend.consignee || !dataToSend.selectPortoEmbarque || !dataToSend.selectPortoDescarga || !dataToSend.selectMercadoria || 
       !dataToSend.tipoContainer || !dataToSend.data_embarque || !dataToSend.Incoterm || !dataToSend.freetimeOrigem || !dataToSend.freetimeDestino || !dataToSend.qtdContainers || !dataToSend.targetOceanFreight )  {
      setcordaFonte("red")
      settipodaFonte("bold")
      alert('Preencha todos os campos obrigatórios')
    } else {
      try {
        // Envia Email para ADMIN
        await api.post('/email/send_quotationnac', dataToSend);
        await api.post('booking/save_quotation', dataToSend);
        routeChange();
      } catch (error) {
          console.error("Ocorreu um problema ao reservar o booking:", error);
      }
    }
  }

  const onAddFornecedor = async (event) => {
    event.preventDefault()
    routeFornecedor()

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
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cotacoes_nac" />
      <main>
        <HeaderPage nomeOpcao="Cotações NAC" />
        <div className="main-content">
          <div className="main-content-title">
            <h2>Cotações - NAC</h2>
            <button onClick={onAddFornecedor} className="fornecedores">Fornecedores</button>
          </div>{" "}
          <form className="row g-3 formulario" onSubmit={sendRequestNAC}>
            <div className='row'>
              <div className="col-md-3">
                <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Shipper *</span>
                <Form.Control
                  type="text"
                  id="shipper"
                  name="shipper"
                  className="selecao"
                  aria-required="true"
                  aria-describedby="shipper"
                />
                <Form.Text id="shipper"></Form.Text>
              </div>    
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Consignee *</span>
                <Form.Control
                  type="text"
                  id="consignee"
                  name="consignee"
                  className="selecao"
                  aria-required="true"
                  aria-describedby="consignee"          
                />
                <Form.Text id="consignee"></Form.Text>
              </div> 
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Porto Embarque</span>
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
                  <TextField {...params} name="selectPortoEmbarque" required />
                )}
              />
              </div>
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Porto Descarga</span>
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
                  <TextField {...params} name="selectPortoDescarga" required />
                )}
              />
              </div>
            </div>
            <p></p>
            <div className='row'>
              <div className="col-md-3">
                <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Mercadoria * <small>(digite o nome para pesquisar)</small> </span>
                <SearchNcm mercadoria={mercadoria} />
              </div>
              <div className="col-md-3">
                <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Tipo Container *</span>
                <Form.Select 
                    id="tipoContainer" 
                    name="tipoContainer" 
                    aria-label="Default select" 
                    className="selecao"
                    value={selectedContainerType}
                    onChange={(event) => setSelectedContainerType(event.target.value)}
                  >
                  <option value="">Selecione</option>
                  <option value="ST20">20' Standard</option>
                  <option value="ST40">40' Standard</option>
                  <option value="HQ40">40' High Cube</option>                  
                  <option value="40RE">40' Reefer</option>
                  <option value="20RE">20' Reefer</option>
                  <option value="40NOR">40' Non Operation Reefer</option>
                  <option value="20FT">20' Flat Rack</option>
                  <option value="40FT">40' Flat Rack</option>
                  <option value="20OT">20' Open Top</option>
                  <option value="40OT">40' Open Top</option>
                  <option value="20PL">20' Platform</option>
                  <option value="40PL">40' Platform</option>
                  <option value="20TK">20' Isotank</option>
                  <option value="40TK">40' Isotank</option>
                </Form.Select>
              </div>
              <div className="col-md-3">
                <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Data Embarque *</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast                    
                    className="data"
                    defaultValue={""}
                    value={formData}
                    onChange={handleInputChange}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-3">
                <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Armador *</span>
                <SearchArmador
                  value={selectedArmadores}
                  onChange={handleArmadorChange}
                  inputValue={inputValue}
                  onInputChange={handleInputArmadorChange}
                />
              </div>
            </div>
            <p></p>
            <div className='row'>
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Incoterm *</span>
                <Form.Select id="Incoterm" name="Incoterm" aria-label="Default select" className="selecao">
                  <option value="" selected>Selecion</option>
                  <option value="C&F">C&F</option>
                  <option value="CIF">CIF</option>
                  <option value="FOB">FOB</option>                  
                </Form.Select>
              </div>
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Free Time Origem *</span>
                <Form.Control
                  type="text"
                  id="freetimeOrigem"
                  name="freetimeOrigem"
                  className="selecao"
                  aria-required="true"
                  aria-describedby="freetimeOrigem"
                />
                <Form.Text id="freetimeOrigem"></Form.Text>
              </div>  
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Free Time Destino *</span>
                <Form.Control
                  type="text"
                  id="freetimeDestino"
                  name="freetimeDestino"
                  className="selecao"
                  aria-required="true"
                  aria-describedby="freetimeDestino"
                />
                <Form.Text id="freetimeDestino"></Form.Text>
              </div>  
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Agente de Carga *</span>
                <Form.Select id="agenteDeCarga" name="agenteDeCarga" aria-label="Default select" className="selecao">
                  <option value="nao" selected>Não</option>
                  <option value="sim">Sim</option>
                </Form.Select>
              </div>  
               
            </div>
            <p></p>
            <div className='row'>
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Carga Especial *</span>
                <Form.Select 
                    id="CargaEspecial" 
                    name="CargaEspecial" 
                    aria-label="Default select" 
                    className="selecao"
                    value={selectedIMO}
                    onChange={(event) => setSelectedIMO(event.target.value)}
                  >
                  <option value="nao" selected>Não IMO</option>
                  <option value="sim">IMO</option>
                </Form.Select>
              </div>
              <div className="col-md-3">
              <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Quantidade de Containers *</span>
                <Form.Control
                  type="number"
                  min={1}
                  id="qtdContainers"
                  className="selecao"
                  name="qtdContainers"
                  aria-required="true"
                  aria-describedby="qtdContainers"
                />
                <Form.Text id="qtdContainers"></Form.Text>
              </div> 
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-3">
                  <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Currency *</span>
                    <Form.Select id="Currency" name="Currency" aria-label="Default select" className="selecao">
                      <option value="dolar"  selected>USD - US$</option>
                      <option value="real">BRL - R$</option>
                      <option value="euro">EUR - € </option>
                    </Form.Select>
                  </div>
                  <div className="col-md-7">
                  <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Target Ocean Freight *</span>
                    <Form.Control
                      type="text"
                      id="targetOceanFreight"
                      name="targetOceanFreight"
                      className="selecao"
                      aria-required="true"
                      aria-describedby="targetOceanFreight"
                    />
                    <Form.Text id="targetOceanFreight"></Form.Text>
                  </div>
                </div>
              </div> 
            </div>
            <div className='row'>
              <div className="col-md-3">
                <span>
                  <Form.Check 
                    type="checkbox" 
                    id="conteinerSelf" 
                    name="conteinerSelf"
                    label="I wish to use shipper’s"
                    value="sim"
                    style={{ marginLeft: '30px' }}
                  />
                  </span>
              </div>  
            </div>
            <p></p>
            <div className="row">
                <p></p>
                <span style={{textAlign: "center"}}><h4>Campos Adicionais</h4></span>
                <hr></hr>
                <p></p>
                    {(selectedIMO ==='sim') && (
                      <div className="col-md-5">
                      <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Descrição Imo *</span>
                      <Form.Control
                        type="text"
                        id="imo"
                        name="imo"
                        className="selecao"
                        aria-required="true"
                        aria-describedby="imo"
                      />
                      <Form.Text id="imo"></Form.Text>
                    </div>
                    )}
                    {(selectedContainerType === '20OT' || selectedContainerType === '40OT' || selectedContainerType === '20PL' || selectedContainerType === '40PL' || selectedContainerType === '20TK' || selectedContainerType === '40TK') && (
                      <div className="col-md-5">
                        <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Dimensões Container*</span>
                        <Form.Control
                          type="text"
                          id="dimensoes"
                          name="dimensoes"
                          className="selecao"
                          aria-required="true"
                          aria-describedby="dimensoes"
                        />
                        <Form.Text id="dimensoes"></Form.Text>
                      </div>
                    )}

                  {(selectedContainerType === '40RE' || selectedContainerType === '20RE') && (
                      <div className="col-md-5">
                        <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Temperatura Container *</span>
                        <Form.Control
                          type="text"
                          id="temperatura"
                          name="temperatura"
                          className="selecao"
                          aria-required="true"
                          aria-describedby="temperatura"
                        />
                        <Form.Text id="temperatura"></Form.Text>
                      </div>
                    )}
                  {(selectedContainerType === '40RE' || selectedContainerType === '20RE') && (
                    <div className="col-md-5">
                      <span style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}>Refrigerado *</span>
                      <table width="30%">
                        <tr>
                          <td width="10%">
                          </td>
                          <td width="20%">
                            <Form.Check 
                              type="radio" 
                              id="refrigeradoSim" 
                              name="refrigerado"
                              label="Sim"
                              value="sim"
                            />
                          </td>
                          <td width="60%">
                          </td>
                          <td width="20%">
                            <Form.Check 
                              type="radio" 
                              id="refrigeradoNao" 
                              name="refrigerado"
                              label="Não"
                              value="nao"
                            />
                          </td>
                        </tr>
                        </table>
                    </div>
                  )}
            </div>
            <p></p>
            <div className='row'>
              <div className="col-md-5">
              </div>
              <div className="col-md-2">
                <Button type="submit" className="botao">Request Quotation</Button>
              </div>
              <div className="col-md-5">
              </div>

            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CotacoesNAC;
