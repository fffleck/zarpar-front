import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import InfoPedido from "../Booking/InfoPedido";
import { useSearchParams } from "react-router-dom";
import "./styles.css";


const Booking = () => {

  const [searchParams] = useSearchParams();

  const dados = {
    armador : searchParams.get("armador"),
    tipo_container : searchParams.get("tipo_container"),
    porto_embarque : searchParams.get("porto_embarque"),
    porto_descarga : searchParams.get("porto_descarga"),
    navio : searchParams.get("navio"),
    data_embarque : searchParams.get("data_embarque"),
    tempo_de_transito : searchParams.get("tempo_de_transito"),
    data_chegada : searchParams.get("data_chegada"),
    frete : searchParams.get("frete"),
    frete_base : searchParams.get("base"),
    frete_bunker : searchParams.get("bunker"),
    frete_isps : searchParams.get("isps"),
    imagem_link : searchParams.get("imagem_link"),
    shipment_id : searchParams.get("shipment_id"),
    mercadoria: searchParams.get("mercadoria"),
    tipo_mercadoria: searchParams.get("tipo_mercadoria")
  }

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cotacoes"/>
      <main>
        <HeaderPage nomeOpcao="Booking"/>
        <div className="main-content">
          <p className="titulo-texto">Cotação / Armadores / Novo Booking</p> 
          <InfoPedido {...dados}/>
        </div>
      </main>
    </div>
  );
};

export default Booking;
