import React from "react";
// import "./styles.css";
import logoMaersk from "../../../assets/imagens/maersk.png";
import logoCMA from "../../../assets/imagens/cma.png";
import logoMsc from "../../../assets/imagens/Imsc.png";
import logoExalog from "../../../assets/imagens/exalog.png";

type ResultadoProps = {
  id_armador: string;
  mercadoria: string;
  tipo_container: string;
  porto_embarque: string;
  porto_descarga: string;
  navio: string;
  data_embarque: string;
  tempo_de_transito: string;
  data_chegada: string;
  frete: string;
};

const Resultado = (props: ResultadoProps) => {
  const relLogoArmador = [
    {
      idArmador: "1",
      logo: logoMaersk,
    },
    {
      idArmador: "2",
      logo: logoCMA,
    },
    {
      idArmador: "3",
      logo: logoMsc,
    },
    {
      idArmador: "4",
      logo: logoExalog,
    },
  ];
  let logo = relLogoArmador.find(
    (rel) => props.id_armador === rel.idArmador
  )?.logo;

  return (
    <tr key={props.navio}>
      <td className="tdImg">
        <img height={30} src={logo} alt="Logo" />
      </td>
      <td>{props.navio}</td>
      <td>{props.data_embarque}</td>
      <td>{props.porto_embarque}</td>
      <td>{props.porto_descarga}</td>
      <td>{props.frete}</td>
      <td>{props.tempo_de_transito.replace("days", "dias")}</td>
      <td>{props.data_chegada}</td>
    </tr>
  );
};

// function formatDate(date: string) {
//   let dateDate = new Date(Date.parse(date));
//   return `${("0000" + dateDate.getUTCDate()).slice(-2)}/${(
//     "0000" +
//     (dateDate.getUTCMonth() + 1)
//   ).slice(-2)}/${dateDate.getUTCFullYear()}`;
// }

export default Resultado;
