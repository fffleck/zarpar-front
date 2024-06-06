import Sidebar from "../../Sidebar";
import HeaderPage from "../../HeaderPage";
import ImgHands from "../../../assets/imagens/hands.png"
import ImgWpp from "../../../assets/imagens/wpp_black.png"
import ImgFone from "../../../assets/imagens/telefone-icon.png"

const SucessoQuotation = () => {

  return (
    <div className="flex-dashboard">
      <Sidebar />
      <main>
        <HeaderPage nomeOpcao="Quotation"/>
        <div className="container-card">
            <div className="card">
                <img height="200px" width="200px" src={ImgHands} alt="Hands" className="img-tick"></img>
                <h1 className="titulo">Quotations NAC Processado</h1>
                <p className="texto">Em breve um de nossos analistas irá entrar em contato.</p>
                <p className="texto">Se preferir, fale conosco  agora através dos nossos canais clicando no ícone abaixo:</p>
                <p className="texto">ou então enviando email para <a href="mailto:comercial@zarpar.net"> Central do Cliente</a>:</p>
                <table>
                  <tr>
                    <td> <a href="https://wa.me/+5511987474777" target="_blank" rel="noreferrer">
                            <img height="50px" src={ImgWpp} alt="WhatsApp logo" className="logo-contato"/>
                         </a>
                    </td>
                    <td> &nbsp;&nbsp;&nbsp;</td>
                    <td><a href="tel:+5511987474777" target="_blank" rel="noreferrer">
                          <img height="50px" src={ImgFone} alt="WhatsApp logo" className="logo-contato"/>
                        </a>
                    </td>
                  </tr>
                </table>
               
                
            </div>
        </div>
      </main>
    </div>
  );
};

export default SucessoQuotation;