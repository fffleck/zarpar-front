import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import logoCMA from "../../assets/imagens/cma.png";
import { Button } from "react-bootstrap";

const Booking = () => {

  const dadosPedido = {
    numeroReserva : 123456789,
    armador: "CMA - CGM",
    navio: "Cap San Antonio 225R",
    portoEmbarque: "Santos, Brazil",
    terminalEmbarque: "137",
    transbordo: "Direto",
    portoDesembarque: "Hamburg",
    deadLineDraft: "20/04/23 às 18h",
    deadLineCarga: "22/04/23 às 18h",
    quantidadeContainers: 2,
    tipoContainer: "20'DV",
    moeda: "USD",
    precoContainer: 2400
  }

  const dadosMercadoria= {
    mercadoria  : "Coffee",
    tipo: "DRY",
  }

  const dadosEmbarcador = {
    nome: "Karavel Trade LTDA",
    endereco: "Av. Giovanni Granchi, 6658",
    CNPJ: "22.843.277/0001-50",
    telefone: "+55 11 987474777"
  }

  let precoTotal = dadosPedido.quantidadeContainers*dadosPedido.precoContainer;

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  

  return (
    <div className="flex-dashboard">
      <Sidebar />
      <main>
        <HeaderPage />
        <div className="main-content">
          <p className="titulo-texto">Cotação / Armadores / Pedidos de Booking</p>  
          <div className = "container">
              <div>
                <section className="pedido-reserva">
                    <div className="topo">
                      <h2 className="titulo-secao">Pedido de Reserva: #{dadosPedido.numeroReserva}</h2> 
                      <img src={logoCMA} height="50px" alt="Logo do armador"></img>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Armador</p>
                      <p>{dadosPedido.armador}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Navio</p>
                      <p>{dadosPedido.navio}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Porto de Embarque</p>
                      <p>{dadosPedido.portoEmbarque}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Terminal Embarque</p>
                      <p>{dadosPedido.terminalEmbarque}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Transbordo</p>
                      <p>{dadosPedido.transbordo}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Porto de Desembarque</p>
                      <p>{dadosPedido.portoDesembarque}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Dead Line de Draft</p>
                      <p>{dadosPedido.deadLineDraft}</p>
                    </div>
                    <div className="item-reserva">
                      <p className="item-reserva__titulo">Dead Line de Carga</p>
                      <p>{dadosPedido.deadLineCarga}</p>
                    </div>
                    <Button as="input" type="button" value="Mudar navio" className="botao"/>
                </section>
                <section className="dados-embarcador">
                  <h2 className="titulo-secao__embarcador">Dados do Embarcador</h2> 
                  <div className="item-embarcador">
                      <p className="item-embarcador__titulo">Embarcador</p>
                      <input type="text" value={dadosEmbarcador.nome} disabled/>
                    </div>
                    <div className="item-embarcador">
                      <p className="item-embarcador__titulo">Endereço</p>
                      <input type="text" value={dadosEmbarcador.endereco} disabled/>
                    </div>
                    <div className="item-embarcador">
                      <p className="item-embarcador__titulo">CNPJ</p>
                      <input type="text" value={dadosEmbarcador.CNPJ} disabled/>
                    </div>
                    <div className="item-embarcador">
                      <p className="item-embarcador__titulo">Telefone</p>
                      <input type="text" value={dadosEmbarcador.telefone} disabled/>
                    </div>
                    <Button as="input" type="button" value="Editar" className="botao"/>
                </section>

              </div>
              <section className="ajuste-reserva">
                <h2 className="titulo-secao">Ajuste sua reserva</h2> 
                <div className="item-ajuste">
                    <p className="item-ajuste__titulo">Mercadoria</p>
                    <input type="text" value={dadosMercadoria.mercadoria} disabled/>
                </div>
                <div className="item-ajuste">
                    <p className="item-ajuste__titulo">Porto de Embarque</p>
                    <input type="text" value={dadosPedido.portoEmbarque} disabled/>
                </div>
                <div className="item-ajuste">
                    <p className="item-ajuste__titulo">Porto de Descarga</p>
                    <input type="text" value={dadosPedido.portoDesembarque} disabled/>
                </div>
                <div className="item-ajuste">
                    <p className="item-ajuste__titulo">Tipo de Mercadoria</p>
                    <input type="text" value={dadosMercadoria.tipo} disabled/>
                </div>
                <div className="item-ajuste">
                    <p className="item-ajuste__titulo">Data de Embarque</p>
                    <input type="text" value={dadosPedido.deadLineCarga} disabled/>
                </div>
                <div className="item-ajuste">
                    <p className="item-ajuste__titulo">Quantidade de Containers</p>
                    <input type="text" value={dadosPedido.quantidadeContainers}/>
                </div>
                <div className="item-ajuste"> 
                    <p className="item-ajuste__titulo">Tipo de Container</p>
                    <input type="text" value={dadosPedido.tipoContainer} disabled/>
                </div>

                <h2 className="valor-frete">Total Frete a Pagar</h2> 
                <p className="preco">{`${USDollar.format(precoTotal)}`}</p>
                <Button as="input" type="button" value="Reservar" className="botao"/>
              </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
