/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import "./styles.css";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import api from '../../services/api';
import TabelaNac from './TabelaNac/tabelanac';

interface ResponseItem {
  id: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  quantidade_containers: string;
  tipo_container: string;
  data_embarque: string;
  armador: string;
  embarcador_email: string;
  embarcador_nome: string;
}

const Dashboard = () => {
  const email = sessionStorage.getItem("user_email");
  const[qtSearch, setqtSearch] = useState(0);
  const[qtBooking, setqtBooking] = useState(0);
  const [nameUser, setNameUser] = useState('Visitante')
  const [response, setResponse] = useState<ResponseItem[]>([]);

  useEffect(() => {
    api.post('/user/find_user', {email})
      .then(resp => {
        setNameUser(resp.data.user.name)
        setqtSearch(resp.data.user.search ?? 0);
    });

    api.post('/booking/list_booking', {email})
    .then(resp => {
      const totalBooking = resp.data.list.length;
      setqtBooking(totalBooking);
    })

    const fetchData = async () => {
      try {
        await api.get(`quotations/mynacs/${email}`).then((res) => {
          setResponse(res.data.list);
        });
      } catch (error) {
        console.error('Error fetching quotations data:', error);
      }
    };

    fetchData();
  }, [email]);


  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="dashboard"/>
      <main>
        <HeaderPage nomeOpcao="Dashboard"/>
          <div className="main-content">
            <div className="container dashboard">
                <div className="row gap-3 mt-3">
                <div className="card border-light col-xl-4 col-lg-12 col-md-12 card-profile" style={{"padding": 0}}>
                  <div
                    className="card-img-top" 
                    style={{"backgroundColor": "#ADD8E6"}}
                  >
                    <h5 className="card-title m-3 mb-4" style={{"color": "black"}}>Bem Vindo!</h5>
                  </div>
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg"
                    alt=""
                    style={{
                      "width": "90px",
                      "height": "50px",
                      "position": "absolute",
                      "top": "50px",
                      "left": "5px",
                      "borderRadius": "8px",
                      "objectFit": "contain",
                    }}
                  />
                  <div className="card-body row m-1">
                    <h4 className="col-8 card-subtitle" style={{"padding": 0}}>{nameUser} </h4>
                    <button className="col-4 btn btn-primary btn-sm">
                      <Link to="/conta" style={{color: "white"}}> Conta  </Link>
                    </button>
                  </div>
                </div>
                <div className="card border-light col-xl-2 col-lg-3 col-md-4 col-sm-12 card-dash">
                  <div className="card-body">
                  <img
                    src="/imagens/list.png"
                    alt=""
                    style={{
                      "width": "70px",
                      "height": "35px",
                      "position": "absolute",
                      "top": "5px",
                      "left": "140px",
                      "borderRadius": "8px",
                      "objectFit": "contain",
                    }}
                  />
                    <div className="top-card-dash fs-4 row column-gap-2">
                      <h6 className="col-8 card-title pd-0">Cotações Solicitadas</h6>
                      
                      
                    </div>
                    <h1 className="card-data text-center">{qtSearch}</h1>
                    <div style={{"textAlign":"right"}}>
                      <Link to="/cotacoes">Solicitar Cotação</Link>
                    </div>
                  </div>
                </div>
                <div className="card border-light col-xl-2 col-lg-3 col-md-4 col-sm-12 card-dash">
                  <div className="card-body">
                  <img
                    src="/imagens/ship.svg"
                    alt=""
                    style={{
                      "width": "90px",
                      "height": "35px",
                      "position": "absolute",
                      "top": "5px",
                      "left": "140px",
                      "borderRadius": "8px",
                      "objectFit": "contain",
                    }}
                  />
                    <div className="top-card-dash fs-4 row column-gap-2">
                      <h6 className="col-8 card-title pd-0">Bookings Solicitados</h6>
                      <i className="col-2 bi bi-map pd-0"></i>
                    </div>
                    <h1 className="card-data text-center">{qtBooking}</h1>
                    <div style={{"textAlign":"right"}}>
                      <Link to="/bookings">Detalhes </Link>
                      <img src="/imagens/right.svg" style={{ "width": "35px", "height": "20px"}}></img>
                    </div>
                  </div>
                </div>
                <div className="card border-light col-xl-3 col-lg-12 col-md-8 card-profile" style={{"padding": 0}}>
                  <div className="card-img-top" style={{"backgroundColor": "#ADD8E6", "padding": 10}} >
                    <h5 style={{"color": "black", "textAlign": "center"}}> Solicitar Cotação Instantânea </h5></div>
                    <div style={{"padding": 40}}>
                    <Link to="/cotacoes"> 
                      <button className="col-lg-12 col-md-8 btn btn-primary btn-big" >
                        Cotação Rápida  <i className="bi bi-arrow-right"></i>
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <br></br>
                {/* {((email !== "ffleck@gmail.com") && (email !== "alvaro@karavel.com.br")) && (                  
                  <table width="95%">
                  <tr>
                    <td>
                    <div className="card  col-xl-12 col-lg-12 col-md-8 card-profile">
                      <div className="card-img-top" style={{"backgroundColor": "#ADD8E6", "padding": 10}} >
                        <h4 style={{"color": "black", "textAlign": "center"}}> Cotações NAC </h4>
                      </div>
                        <TabelaNac response={response}/>
                    </div>
                    </td>
                  </tr>
                </table>
                
              )}  */}
                
                </div>
            </div>
          
      </main>
    </div>
  );
};

export default Dashboard;
