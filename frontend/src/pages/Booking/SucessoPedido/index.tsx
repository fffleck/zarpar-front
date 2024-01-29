import Sidebar from "../../Sidebar";
import HeaderPage from "../../HeaderPage";
import ImgHands from "../../../assets/imagens/hands.png"
import ImgWpp from "../../../assets/imagens/wpp_black.png"

const SucessoPedido = () => {

  return (
    <div className="flex-dashboard">
      <Sidebar />
      <main>
        <HeaderPage nomeOpcao="Booking"/>
        <div className="container-card">
            <div className="card">
                <img height="200px" width="200px" src={ImgHands} alt="Hands" className="img-tick"></img>
                <h1 className="titulo">Booking realizado</h1>
                <p className="texto">Em breve um de nossos analistas irá entrar em contato.</p>
                <p className="texto">Se preferir, fale conosco  agora através do WhatsApp clicando no ícone abaixo:</p>
                <a href="https://wa.me/+5511987474777" target="_blank" rel="noreferrer">
                    <img height="50px" src={ImgWpp} alt="WhatsApp logo" className="logo-contato"/>
                </a>
            </div>
        </div>
      </main>
    </div>
  );
};

export default SucessoPedido;