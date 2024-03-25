import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { Autocomplete, TextField } from '@mui/material';


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

interface ItemSelect {
  idItem: any;
  name: string;
}

const InfoPedido = (props: InformacoesPedido) => {
const [mercadorias, setMercadorias] = useState<ItemSelect[]>([]);
const[nomeEmbarcador, setNomeEmbarcador] = useState('');
const[enderecoEmbarcador, setEnderecoEmbarcador] = useState('');
const[cnpjEmbarcador, setCnpjEmbarcador] = useState('');
const[telefoneEmbarcador, setTelefoneEmbarcador] = useState('');
const[mercadoria, setMercadoria] = useState('');
const[tipoMercadoria, setTipoMercadoria] = useState('');
const [valueMercadoria, setValueMercadoria] = useState(null);
const [inputValueMercadoria, setInputValueMercadoria] = useState("");


let navigate = useNavigate(); 

const routeChange = () =>{ 
  const path = "/pedido_resultado";
  navigate(path);
}

const email = sessionStorage.getItem("user_email");
const moeda = '$';
const valorFrete = Number(props.frete);


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

useEffect(() => {
  api.get("filters/mercadorias").then((response) => {
    setMercadorias(response.data);
  });
}, []);

const listaMercadorias = mercadorias.map((mercadoria) => ({
  label: mercadoria.name,
  id: mercadoria.idItem,
}));

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

const saveBooking = async (event) => {
  event.preventDefault();
  await api.post('/booking/save_booking', informacoesEnviarEmail)
  .then((res) => {
    console.log("Booking salvo");
  })
  .catch(err => {
    console.log("Ocorreu um problema ao salvar o booking no banco de dados");
  })
}

function handleInputSubmit(event){

  sendEmailAnalisys(event);
  sendEmailClient(event);
  saveBooking(event);
  routeChange();
}


return (  
  <form className = "form">
    <div className="col-md-7">
      <section className="pedido-reserva">
      
          <div className="topo">
            <h2 className="titulo-secao">Template</h2>
          </div>
          <Autocomplete
                value={valueMercadoria}
                onChange={(event, newValue) => {
                  setValueMercadoria(newValue);
                }}
                inputValue={inputValueMercadoria}
                onInputChange={(event, newInputValue) => {
                  setInputValueMercadoria(newInputValue);
                }}
                className="selecao"
                disablePortal
                id="combo-box-demo"
                options={listaMercadorias}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Template" required />
                )}
              />


          <div className="item-reserva">
            <p className="item-reserva__titulo">Armador</p>
            <p>{dadosPedido.armador}</p>
          </div>
          
          <div className="item-reserva">
            <p className="item-reserva__titulo">Navio</p>
            <p>{dadosPedido.navio}</p>
          </div>
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
            <p>{dadosPedido.data_embarque}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Dead Line de Carga</p>
            <p>{dadosPedido.data_embarque}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Porto de Embarque</p>
            <p>{dadosPedido.porto_embarque}</p>
          </div>
          <div className="item-reserva">
            <p className="item-reserva__titulo">Porto de Desembarque</p>
            <p>{props.porto_descarga}</p>
          </div>
          
      </section>
      {/* <section className="dados-embarcador">
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
      </section> */}
    </div>
    <div className="col-md-4">
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
    </div>
  </form>
)

}

export default InfoPedido;