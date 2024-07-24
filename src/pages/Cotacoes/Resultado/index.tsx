import React from "react";
import ButtonBooking from "../../ButtonBooking";
import LabelModal from "../Modal";
import { useNavigate } from "react-router-dom";

type ResultadoProps = {
  armador: string;
  id_armador: string;
  tipo_container: string;
  porto_embarque: string;
  porto_descarga: string;
  navio: string;
  data_embarque: string;
  tempo_de_transito: string;
  data_chegada: string;
  base_freight: string;
  bunker: string;
  isps: string;
  imagem_link: string;
  shipment_id: string;
};

const Resultado = (props: ResultadoProps) => {
  let navigate = useNavigate();
  const routeChange = () => {
    const path = '/nac';
    navigate(path);
  }
 
  if (props.imagem_link === " - "){
    return (
      <tr key={props.shipment_id}>
        <td className="tdImg"> <img height={50} src={"/imagens/armador_"+props.id_armador+".png"} alt="Logo" /></td>
        <td>{props.armador}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td>
          <LabelModal {...props}/>
        </td>
        <td>{props.tempo_de_transito } dias </td>
        <td>{props.data_chegada }</td>
        <td>
          <ButtonBooking {...props}/>
        </td>
      </tr>
    );
  } else if (props.base_freight === "No space available") {
    return (
      <tr key={props.shipment_id}>
       <td className="tdImg"> <img height={50} src={"/imagens/armador_"+props.id_armador+".png"} alt="Logo" /></td>
        <td>{props.armador}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td colSpan={4}>
          <LabelModal {...props}/>
        </td>
      </tr>
    );
  } else {
    return (
      <tr key={props.shipment_id}>
        <td className="tdImg">
          <img height={50}  src={"/imagens/armador_"+props.id_armador.replace(" ","_")+".png"} alt="Logo" />
        </td>
        <td>{props.armador}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td>
          <LabelModal {...props}/>
        </td>
        <td>{props.tempo_de_transito.replace("days", "dias")}</td>
        <td>{props.data_chegada}</td>
        <td>
          <ButtonBooking {...props} />
        </td>
      </tr>
    );
  }
};

// function formatDate(date: string) {
//   let dateDate = new Date(Date.parse(date));
//   return `${("0000" + dateDate.getUTCDate()).slice(-2)}/${(
//     "0000" +
//     (dateDate.getUTCMonth() + 1)
//   ).slice(-2)}/${dateDate.getUTCFullYear()}`;
// }

export default Resultado;
