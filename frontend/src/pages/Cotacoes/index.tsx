import React, { useEffect, useState, FormEvent } from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import api from "../../services/api";
import TabelaResultados from "./TabelaResultados";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Autocomplete, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
//import Select from "react-select";

interface ItemSelect {
  idItem: any;
  name: string;
}

interface PortoSelect {
  port_id: string;
  port_name: string;
}

interface ResponseItem {
  tipo_container: string;
  id_tipo_container: string;
  porto_embarque: string;
  id_porto_embarque: string;
  porto_descarga: string;
  id_porto_descarga: string;
  armador: string;
  id_armador: string;
  navio: string;
  data_embarque: string;
  tempo_de_transito: string;
  data_chegada: string;
  frete: string;
  shipment_id: string;
  imagem_link: string;
}

interface ResponseError {
  message: string;
}

type informacoesEnviarEmail = {
  armador: string;
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
  embarcador_empresa: string;
  valor: string;
};

type ResponseAPI = Array<ResponseItem> | ResponseError;

function returnTableorNot(response: ResponseAPI, searchClicked: boolean) {
  if (response && Array.isArray(response) && response.length > 0) {
    return <TabelaResultados response={response} />;
  } else if (searchClicked && (response as ResponseError).message) {
    return (
      <Alert key={"secondary"} variant={"secondary"}>
        Nenhum frete foi encontrado.
      </Alert>
    );
  }
}

const Cotacoes = () => {
  const [mercadorias, setMercadorias] = useState<ItemSelect[]>([]);
  const [tiposMercadoria, setTiposMercadoria] = useState<ItemSelect[]>([]);
  const [tiposContainer, setTiposContainer] = useState<ItemSelect[]>([]);
  const [portosEmbarque, setPortosEmbarque] = useState<PortoSelect[]>([]);
  const [portosDescarga, setPortosDescarga] = useState<PortoSelect[]>([]);
  const [response, setResponse] = useState<ResponseItem[]>([]);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [btnSearchDisabled, setBtnSearchDisabled] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Dayjs | null>(null);
  const [valueMercadoria, setValueMercadoria] = useState(null);
  const [valuePortoEmbarque, setValuePortoEmbarque] = useState(null);
  const [valuePortoDescarga, setValuePortoDescarga] = useState(null);
  const [valueTipoMercadoria, setValueTipoMercadoria] = useState(null);
  const [valueTipoContainer, setValueTipoContainer] = useState(null);
  const [inputValueMercadoria, setInputValueMercadoria] = useState("");
  const [inputValuePortoEmbarque, setInputValuePortoEmbarque] = useState("");
  const [inputValuePortoDescarga, setInputValuePortoDescarga] = useState("");
  const [inputValueTipoMercadoria, setInputValueTipoMercadoria] = useState("");
  const [inputValueTipoContainer, setInputValueTipoContainer] = useState("");
  const email = sessionStorage.getItem("user_email");
  const [nomeEmbarcador, setNomeEmbarcador] = useState("");
  const [enderecoEmbarcador, setEnderecoEmbarcador] = useState("");
  const [cnpjEmbarcador, setCnpjEmbarcador] = useState("");
  const [telefoneEmbarcador, setTelefoneEmbarcador] = useState("");
  const [empresaEmbarcador, setEmpresaEmbarcador] = useState("");

  useEffect(() => {
    api.get("filters/mercadorias").then((response) => {
      setMercadorias(response.data);
    });

    api.get("filters/portos_embarque").then((response) => {
      setPortosEmbarque(response.data);
    });

    api.get("filters/portos_descarga").then((response) => {
      setPortosDescarga(response.data);
    });

    api.get("filters/tipos_container").then((response) => {
      setTiposContainer(response.data);
    });

    api.get("filters/tipos_mercadoria").then((response) => {
      setTiposMercadoria(response.data);
    });

    api
      .post("/user/find_user", { email })
      .then((resp) => {
        setNomeEmbarcador(resp.data.user.name);
        setEnderecoEmbarcador(resp.data.user.address);
        setCnpjEmbarcador(resp.data.user.cnpj);
        setTelefoneEmbarcador(resp.data.user.telefone);
        setEmpresaEmbarcador(resp.data.user.enterpriseName);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleInputChange(event) {
    //const data = dayjs(`${event.$y}-${event.$M+1}-${event.$D}`).format('YYYY-MM-DD'); //Formato da data
    setFormData(dayjs(`${event.$y}-${event.$M + 1}-${event.$D}`));
  }

  const listaMercadorias = mercadorias.map((mercadoria) => ({
    label: mercadoria.name,
    id: mercadoria.idItem,
  }));
  const listaPortosEmbarque = portosEmbarque.map((portoEmbarque) => ({
    label: portoEmbarque.port_name,
    id: portoEmbarque.port_id,
  }));
  const listaPortosDescarga = portosDescarga.map((portoDescarga) => ({
    label: portoDescarga.port_name,
    id: portoDescarga.port_id,
  }));
  const listaTiposMercadoria = tiposMercadoria.map((tipoMercadoria) => ({
    label: tipoMercadoria.name,
    id: tipoMercadoria.idItem,
  }));
  const listaTiposContainer = tiposContainer.map((tipoContainer) => ({
    label: tipoContainer.name,
    id: tipoContainer.idItem,
  }));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (formData === null) return; //verifica se a data foi escolhida
    const data_saida = dayjs(formData).format("YYYY-MM-DD");

    setBtnSearchDisabled(true);
    setSearchClicked(true);
    setBtnLoading(true);

    // let query = `cotacao/fretes?data_saida=${data_saida}&porto_embarque=${selectedPortoEmbarque}&porto_descarga=${selectedPortoDescarga}&mercadoria=${selectedMercadoria}&tipo_container=${selectedTipoContainer}`;

    let query = `cotacao/fretes?data_saida=${data_saida}&porto_embarque=${valuePortoEmbarque.id}&porto_descarga=${valuePortoDescarga.id}&mercadoria=${valueMercadoria.id}&tipo_container=${valueTipoContainer.id}`;
    api.get(query).then((res) => {
      setResponse(res.data);
      setBtnSearchDisabled(false);
      setBtnLoading(false);
    });

    console.log(email);

    const informacoesEnviarEmail: informacoesEnviarEmail = {
      armador: "",
      mercadoria: "",
      tipo_mercadoria: "",
      porto_embarque: valuePortoEmbarque.label,
      porto_descarga: valuePortoDescarga.label,
      data_embarque: data_saida,
      tipo_container: valueTipoContainer.label,
      quantidade_containers: 0,
      embarcador_nome: nomeEmbarcador,
      embarcador_email: email,
      embarcador_cnpj: cnpjEmbarcador,
      embarcador_telefone: telefoneEmbarcador,
      embarcador_endereco: enderecoEmbarcador,
      embarcador_empresa: empresaEmbarcador,
      valor: `$0`,
    };

    const sendEmailQuotation = async (event) => {
      event.preventDefault();

      await api
        .post("/email/send_quotation", informacoesEnviarEmail)
        .then((res) => {
          console.log("Enviado para análise");
        })
        .catch((err) => {
          console.log("Ocorreu um problema ao enviar e-mail para análise");
        });
    };

    sendEmailQuotation(event);
  }

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cotacoes" />
      <main>
        <HeaderPage nomeOpcao="Cotações" />
        <div className="main-content">
          <div className="main-content-title">
            <h2>Cotações</h2>
            <p></p>
          </div>{" "}
          <form className="row g-3 formulario" onSubmit={handleSubmit}>
            <div className="col-md-4">
              {/*Mercadoria*/}
              <Autocomplete
                value={valueMercadoria}
                onChange={(event, newValue) => {
                  setValueMercadoria(newValue);
                }}
                inputValue={inputValueMercadoria}
                onInputChange={(event, newInputValue) => {
                  setInputValueMercadoria(newInputValue);
                }}
                className="selecao"
                disablePortal
                id="combo-box-demo"
                options={listaMercadorias}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Mercadoria" required />
                )}
              />
            </div>
            <div className="col-md-4">
              {/* Porto de embarque */}
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
                  <TextField {...params} label="Porto de embarque" required />
                )}
              />
            </div>
            <div className="col-md-4">
              {/*Porto de descarga*/}
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
                  <TextField {...params} label="Porto de descarga" required />
                )}
              />
            </div>
            <div className="col-md-4">
              {/*Tipo de mercadoria*/}
              <Autocomplete
                value={valueTipoMercadoria}
                onChange={(event, newValue) => {
                  setValueTipoMercadoria(newValue);
                }}
                inputValue={inputValueTipoMercadoria}
                onInputChange={(event, newInputValue) => {
                  setInputValueTipoMercadoria(newInputValue);
                }}
                className="selecao"
                disablePortal
                id="combo-box-demo"
                options={listaTiposMercadoria}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de mercadoria" required />
                )}
              />
            </div>
            <div className="col-md-4">
              {/*Tipo de Container*/}
              <Autocomplete
                value={valueTipoContainer}
                onChange={(event, newValue) => {
                  setValueTipoContainer(newValue);
                }}
                inputValue={inputValueTipoContainer}
                onInputChange={(event, newInputValue) => {
                  setInputValueTipoContainer(newInputValue);
                }}
                className="selecao"
                disablePortal
                id="combo-box-demo"
                options={listaTiposContainer}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de container" required />
                )}
              />
            </div>
            <div className="col-md-4 form-data">
              {/*Data*/}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  label="Data de embarque"
                  className="data"
                  defaultValue={""}
                  value={formData}
                  onChange={handleInputChange}
                />
              </LocalizationProvider>
            </div>
            <div className="col-12">
              <button
                type="submit"
                disabled={btnSearchDisabled}
                className="btn btn-primary"
              >
                {btnLoading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    as="span"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <Spinner
                    animation="border"
                    variant="light"
                    as="span"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="visually-hidden"
                  />
                )}
                {"   "}
                Buscar Fretes
              </button>
            </div>
          </form>
          {returnTableorNot(response, searchClicked)}
        </div>
      </main>
    </div>
  );
};

export default Cotacoes;
