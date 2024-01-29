import React from "react";
//import "./styles.css";
//import logoMaersk from "../../../assets/imagens/maersk.png";
//import logoCMA from "../../../assets/imagens/cma.png";
//import logoMsc from "../../../assets/imagens/Imsc.png";
//import logoExalog from "../../../assets/imagens/exalog.png";
//import { Link } from "react-router-dom";
import ButtonBooking from "../../ButtonBooking";

type ResultadoProps = {
  armador: string;
  tipo_container: string;
  porto_embarque: string;
  porto_descarga: string;
  navio: string;
  data_embarque: string;
  tempo_de_transito: string;
  data_chegada: string;
  frete: string;
  imagem_link: string;
  shipment_id: string;
};

const Resultado = (props: ResultadoProps) => {
  // const relLogoArmador = [
  //   {
  //     idArmador: "1",
  //     logo: logoMaersk,
  //   },
  //   {
  //     idArmador: "2",
  //     logo: logoCMA,
  //   },
  //   {
  //     idArmador: "3",
  //     logo: logoMsc,
  //   },
  //   {
  //     idArmador: "4",
  //     logo: logoExalog,
  //   },
  // ];
  // let logo = relLogoArmador.find(
  //   (rel) => props.id_armador === rel.idArmador
  // )?.logo;

  if (props.porto_embarque === "TBI") {
    return (
      <tr key={props.shipment_id}>
        <td className="tdImg">
          <img height={50} src={props.imagem_link} alt="Logo" />
        </td>
        <td>{props.armador}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td colSpan={4}>{"Em breve você recebrá sua cotação por e-mail."}</td>
        {/* <td>
          <ButtonBooking {...props}/>
        </td> */}
      </tr>
    );
  } else {
    return (
      <tr key={props.shipment_id}>
        <td className="tdImg">
          <img height={50} src={props.imagem_link} alt="Logo" />
        </td>
        <td>{props.armador}</td>
        <td>{props.data_embarque}</td>
        <td>{props.porto_embarque}</td>
        <td>{props.porto_descarga}</td>
        <td>{props.frete}</td>
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
