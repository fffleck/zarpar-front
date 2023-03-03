import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import api from "../../services/api";
import TabelaResultados from "./TabelaResultados";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
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
  const [selectedMercadoria, setSelectedMercadoria] = useState("0");
  const [selectedPortoEmbarque, setSelectedPortoEmbarque] = useState("0");
  const [selectedPortoDescarga, setSelectedPortoDescarga] = useState("0");
  const [selectedTipoContainer, setSelectedTipoContainer] = useState("0");
  const [selectedTipoMercadoria, setSelectedTipoMercadoria] = useState("0");
  const [response, setResponse] = useState<ResponseItem[]>([]);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [btnSearchDisabled, setBtnSearchDisabled] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    data_saida: "",
  });

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
  }, []);

  function handleSelectMercadoria(event: ChangeEvent<HTMLSelectElement>) {
    const mercadoria = event.target.value;

    setSelectedMercadoria(mercadoria);
  }

  function handleSelectPortoEmbarque(event: ChangeEvent<HTMLSelectElement>) {
    const porto_embarque = event.target.value;

    setSelectedPortoEmbarque(porto_embarque);
  }

  function handleSelectPortoDescarga(event: ChangeEvent<HTMLSelectElement>) {
    const porto_descarga = event.target.value;

    setSelectedPortoDescarga(porto_descarga);
  }

  function handleSelectTipoContainer(event: ChangeEvent<HTMLSelectElement>) {
    const tipo_container = event.target.value;

    setSelectedTipoContainer(tipo_container);
  }

  function handleSelectTipoMercadoria(event: ChangeEvent<HTMLSelectElement>) {
    const tipo_mercadoria = event.target.value;

    setSelectedTipoMercadoria(tipo_mercadoria);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { data_saida } = formData;

    setBtnSearchDisabled(true);
    setSearchClicked(true);
    setBtnLoading(true);

    let query = `cotacao/fretes?data_saida=${data_saida}&porto_embarque=${selectedPortoEmbarque}&porto_descarga=${selectedPortoDescarga}&mercadoria=${selectedMercadoria}&tipo_container=${selectedTipoContainer}`;
    api.get(query).then((res) => {
      setResponse(res.data);
      setBtnSearchDisabled(false);
      setBtnLoading(false);
    });

    // const { name, email, whatsapp } = formData;
  }
  return (
    <div className="flex-dashboard">
      <Sidebar />
      <main>
        <HeaderPage />
        <div className="main-content">
          <div className="main-content-title">
            <h2>Cotações</h2>
            <p></p>
          </div>{" "}
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label htmlFor="mercadoria" className="form-label">
                Mercadoria
              </label>
              <select
                id="mercadoria"
                name="mercadoria"
                value={selectedMercadoria}
                onChange={handleSelectMercadoria}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                {mercadorias.map((mercadoria) => (
                  <option key={mercadoria.idItem} value={mercadoria.idItem}>
                    {mercadoria.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="porto_embarque" className="form-label">
                Porto de Embarque
              </label>
              <select
                id="porto_embarque"
                name="porto_embarque"
                value={selectedPortoEmbarque}
                onChange={handleSelectPortoEmbarque}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                {portosEmbarque.map((porto_embarque) => (
                  <option
                    key={porto_embarque.port_id}
                    value={porto_embarque.port_id}
                  >
                    {porto_embarque.port_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="porto_descarga" className="form-label">
                Porto de Descarga
              </label>
              <select
                id="porto_descarga"
                name="porto_descarga"
                value={selectedPortoDescarga}
                onChange={handleSelectPortoDescarga}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                {portosDescarga.map((porto_descarga) => (
                  <option
                    key={porto_descarga.port_id}
                    value={porto_descarga.port_id}
                  >
                    {porto_descarga.port_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="tipo_mercadoria" className="form-label">
                Tipo de Mercadoria
              </label>
              <select
                id="tipo_mercadoria"
                name="tipo_mercadoria"
                value={selectedTipoMercadoria}
                onChange={handleSelectTipoMercadoria}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                {tiposMercadoria.map((tipo_mercadoria) => (
                  <option
                    key={tipo_mercadoria.idItem}
                    value={tipo_mercadoria.idItem}
                  >
                    {tipo_mercadoria.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="tipo_container" className="form-label">
                Tipo de Container
              </label>
              <select
                id="tipo_container"
                name="tipo_container"
                value={selectedTipoContainer}
                onChange={handleSelectTipoContainer}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                {tiposContainer.map((tipo_container) => (
                  <option
                    key={tipo_container.idItem}
                    value={tipo_container.idItem}
                  >
                    {tipo_container.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="data_saida" className="form-label">
                Data de Embarque
              </label>
              <input
                type="date"
                id="data_saida"
                name="data_saida"
                onChange={handleInputChange}
                className="form-control"
                required
              />
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
