import React, { ChangeEvent, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';


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
valor: string;
}


const InfoPedido = (props: InformacoesPedido) => {
const[nomeEmbarcador, setNomeEmbarcador] = useState('');
const[enderecoEmbarcador, setEnderecoEmbarcador] = useState('');
const[cnpjEmbarcador, setCnpjEmbarcador] = useState('');
const[telefoneEmbarcador, setTelefoneEmbarcador] = useState('');
const[mercadoria, setMercadoria] = useState('');
const[tipoMercadoria, setTipoMercadoria] = useState('');

let navigate = useNavigate(); 

const routeChange = () =>{ 
  const path = "/pedido_resultado";
  navigate(path);
}

const email = sessionStorage.getItem("user_email");
const [moeda, valorFrete] = props.frete.split(' ');


api.post('/user/find_user', {email})
.then(resp=>{
  setNomeEmbarcador(resp.data.user.name);
  setEnderecoEmbarcador(resp.data.user.address);
  setCnpjEmbarcador(resp.data.user.cnpj);
  setTelefoneEmbarcador(resp.data.user.telefone);
})
.catch(err =>{
  console.error(err);
})


const [qtdContainers, setQtdContainers] = useState(1);

function handleInputContainers(event: ChangeEvent<HTMLInputElement>){
  const quantidade = Number(event.target.value);
  
  setQtdContainers(quantidade);
}

function handleInputMercadoria(event: ChangeEvent<HTMLInputElement>){
  const item = event.target.value;

  setMercadoria(item);
}

function handleInputTipoMercadoria(event: ChangeEvent<HTMLInputElement>){
  const tipo_item = event.target.value;

  setTipoMercadoria(tipo_item);
}

const dadosPedido = {
  ...props,
  moeda: props.frete.split[0], //simbolo moeda
  terminal_embarque: "",
  transbordo: "",
  quantidade_containers: qtdContainers,
  embarcador_nome: nomeEmbarcador,
  embarcador_endereco: enderecoEmbarcador,
  embarcador_cnpj: cnpjEmbarcador,
  embarcador_telefone: telefoneEmbarcador,
  valor: Number(valorFrete)*qtdContainers,
  mercadoria: mercadoria,
  tipo_mercadoria: tipoMercadoria,
}

var precoTotal = dadosPedido.valor;

const informacoesEnviarEmail:informacoesEnviarEmail = {
  armador: props.armador,
  mercadoria: mercadoria,
  tipo_mercadoria: tipoMercadoria,
  porto_embarque: props.porto_embarque,
  porto_descarga: props.porto_descarga,
  data_embarque: props.data_embarque,
  tipo_container: props.tipo_container,
  quantidade_containers: Number(qtdContainers),
  embarcador_nome: nomeEmbarcador,
  embarcador_email: email,
  embarcador_cnpj: cnpjEmbarcador,
  embarcador_telefone: telefoneEmbarcador,
  embarcador_endereco: enderecoEmbarcador,
  valor: `${moeda} ${precoTotal}` 
}



const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const sendEmailAnalisys = async (event) => {
  event.preventDefault();

  await api.post('/email/send_analysis', informacoesEnviarEmail)
  .then((res) => {
    console.log("Enviado para análise");
  })
  .catch(err => {
    console.log("Ocorreu um problema ao enviar e-mail para análise");
  })
}

const sendEmailClient = async (event) => {
  event.preventDefault();

  await api.post('/email/send_client', informacoesEnviarEmail)
  .then((res) => {
    console.log("Enviado para cliente");
  })
  .catch(err => {
    console.log("Ocorreu um problema ao enviar e-mail para o cliente");
  })
}

function handleInputSubmit(event){
  sendEmailAnalisys(event);
  sendEmailClient(event);
  routeChange();
}



return (  
  <form className = "form">
    <div>
      <section className="pedido-reserva">
          <div className="topo">
            <h2 className="titulo-secao">Pedido de Reserva</h2>
            <img src={dadosPedido.imagem_link} height="50px" alt="Logo do armador"></img>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Armador</p>
            <p>{dadosPedido.armador}</p>
          </div>
          {/*
          <div className="item-reserva">
            <p className="item-reserva__titulo">Navio</p>
            <p>{dadosPedido.navio}</p>
          </div>*
          <div className="item-reserva">
            <p className="item-reserva__titulo">Terminal Embarque</p>
            <p>{dadosPedido.terminal_embarque}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Transbordo</p>
            <p>{dadosPedido.transbordo}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Dead Line de Draft</p>
            <p>{dadosPedido.data_deadline_draft}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Dead Line de Carga</p>
            <p>{dadosPedido.data_embarque}</p>
          </div>
          */}
          <div className="item-reserva">
            <p className="item-reserva__titulo">Porto de Embarque</p>
            <p>{dadosPedido.porto_embarque}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Porto de Desembarque</p>
            <p>{props.porto_descarga}</p>
          </div>
          <Button as="input" type="button" value="Mudar navio" className="botao" onClick={routeChange}/>
      </section>
      <section className="dados-embarcador">
        <h2 className="titulo-secao__embarcador">Dados do Embarcador</h2> 
        <div className="item-embarcador">
            <p className="item-embarcador__titulo">Embarcador</p>
            <input type="text" value={nomeEmbarcador} disabled/>
          </div>
          <div className="item-embarcador">
            <p className="item-embarcador__titulo">Endereço</p>
            <input type="text" value={enderecoEmbarcador} disabled/>
          </div>
          <div className="item-embarcador">
            <p className="item-embarcador__titulo">CNPJ</p>
            <input type="text" value={cnpjEmbarcador} disabled/>
          </div>
          <div className="item-embarcador">
            <p className="item-embarcador__titulo">Telefone</p>
            <input type="text" value={telefoneEmbarcador} disabled/>
          </div>
          <Button as="input" type="button" value="Editar" className="botao"/>
      </section>

    </div>
    <section className="ajuste-reserva">
      <h2 className="titulo-secao">Ajuste sua reserva</h2> 
      <div className="item-ajuste">
          <p className="item-ajuste__titulo">Mercadoria</p>
          <input type="text" className="espacamento" onChange={handleInputMercadoria} value={mercadoria} required/>
      </div>
      <div className="item-ajuste">
          <p className="item-ajuste__titulo">Porto de Embarque</p>
          <input type="text" value={dadosPedido.porto_embarque} disabled className="espacamento"/>
      </div>
      <div className="item-ajuste">
          <p className="item-ajuste__titulo">Porto de Descarga</p>
          <input type="text" value={dadosPedido.porto_descarga} disabled className="espacamento"/>
      </div>
      <div className="item-ajuste">
          <p className="item-ajuste__titulo">Tipo de Mercadoria</p>
          <input type="text" required className="espacamento" value={tipoMercadoria} onChange={handleInputTipoMercadoria}/>
      </div>
      <div className="item-ajuste">
          <p className="item-ajuste__titulo">Data de Embarque</p>
          <input type="text" value={dadosPedido.data_embarque} disabled className="espacamento"/>
      </div>
      <div className="item-ajuste">
          <p className="item-ajuste__titulo">Quantidade de Containers</p>
          <input type="number" min={1} value={dadosPedido.quantidade_containers} onChange={handleInputContainers} className="espacamento"/>
      </div>
      <div className="item-ajuste"> 
          <p className="item-ajuste__titulo">Tipo de Container</p>
          <input type="text" value={dadosPedido.tipo_container} disabled className="espacamento"/>
      </div>

      <h2 className="valor-frete">Total Frete a Pagar</h2> 
      <p className="preco">{`${USDollar.format(precoTotal)}`}</p>
      <Button as="input" type="button" value="Reservar" className="botao" onClick={handleInputSubmit}/>
    </section>
  </form>
)

}

export default InfoPedido;