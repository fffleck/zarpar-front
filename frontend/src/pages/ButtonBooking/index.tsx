import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type InformacoesPedido = {
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

const ButtonBooking = (props: InformacoesPedido) => {
  let navigate = useNavigate();

  const routeChange = () => {
    const path = encodeURI(
      `/booking?armador=${props.armador}&tipo_container=${props.tipo_container}&porto_embarque=${props.porto_embarque}&porto_descarga=${props.porto_descarga}&navio=${props.navio}&data_embarque=${props.data_embarque}&tempo_de_transito=${props.tempo_de_transito}&data_chegada=${props.data_chegada}&frete=${props.frete}&imagem_link=${props.imagem_link}&shipment_id=${props.shipment_id}`
    );

    navigate(path);
  };

  if (props.porto_embarque === "TBI") {
    return <Button as="input" type="button" value="Book now" disabled />;
  } else {
    return (
      <Button as="input" type="button" value="Book now" onClick={routeChange} />
    );
  }
};

export default ButtonBooking;
