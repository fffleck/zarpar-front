import React, { useState } from "react";
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import api from "../../services/api";
import Alert from "react-bootstrap/Alert";
import TabelaResultados from "./TabelaResultados";


interface ResponseError {
  message: string;
}


interface ResponseUpload {
  sucess: boolean;
  arquivo: string;
  total_registros: string;
  total_importados: string;
}

type ResponseAPI = ResponseUpload | ResponseError;

function returnTableorNot(response: ResponseAPI, searchClicked: boolean) {
  if (response && response.success === true) {
    return <TabelaResultados response={response} />;
  } else if (searchClicked && (response as ResponseError).message) {
    return (
      <Alert key={"secondary"} variant={"secondary"}>
        Nenhum frete foi encontrado.
      </Alert>
    );
  }
}

function refreshPage() { 
  window.location.href = '/upload';
}; 

function FileUpload() {
  const [file, setFile] = useState(null);
  const [btnSearchDisabled, setBtnSearchDisabled] = useState<boolean>(false);
  const [responseUpload, setResponseUpload] = useState<ResponseUpload>({});
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setBtnSearchDisabled(true);
    setSearchClicked(true);

    reader.onloadend = async () => {
      try {
        await api.post('/upload/files', {
          data: reader.result
        }).then((res) => {
          setResponseUpload(res.data);    
          return <TabelaResultados response={responseUpload} />;
        });
        ;
      } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
      }
    };
  };

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="upload"/>
      <main>
        <HeaderPage nomeOpcao="Upload"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Upload</h2>
            <p></p>
          </div>
          <div className="col-md-9">
              <div className=" row col-12">
                <div className="Upload-img"></div><br/>
              </div>
              <p> Selecione o arquivo Excel (.xlsx) que deseja importar e clique em enviar</p>
              <div className="col-12">
              <div className="Upload-form">
                  <label htmlFor="file" className="form-label">
                      Arquivo: 
                    </label>
                  <input className="form-control" type="file" onChange={handleFileChange} />
                  <p></p>
                  <button  disabled={btnSearchDisabled} className="btn btn-primary" onClick={handleSubmit}>Enviar</button>&nbsp;
                  <button  className="btn btn-primary" onClick={refreshPage}>Limpar</button>
              </div>
              </div>
          </div>
          <br />
          { returnTableorNot(responseUpload, searchClicked) }
          </div>
      </main>
    </div>
  );
}

export default FileUpload;