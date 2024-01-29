import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import InfoPedido from "../Booking/InfoPedido";
import { useSearchParams } from "react-router-dom";

const Booking = () => {

  const [searchParams, _] = useSearchParams();

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
          <p className="titulo-texto">Cotação / Armadores / Pedidos de Booking</p> 
          <InfoPedido {...dados}/>
        </div>
      </main>
    </div>
  );
};

export default Booking;
