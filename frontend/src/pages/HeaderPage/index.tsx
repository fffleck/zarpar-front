import "./styles.css";
import { Link } from "react-router-dom";
import ImgFone from "../../assets/imagens/whatss.png"


const HeaderPage = (props) => {

  function logout(){
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_email");
    window.location.reload(); //recarrega a página assim que o token é retirado da sessão
  }

  const nomeAba = props.nomeOpcao;

  return (
    <header>
      <Link to="/">
        {" "}
        <i className="fa-solid fa-bars"></i>{nomeAba}
      </Link>

      <div className="whatss">
        <Link to="https://wa.me/+5511987474777" className="whatss" target="_blank" rel="noreferrer">
          <img height="50px" src={ImgFone} alt="WhatsApp logo" className="logo-contato img"></img>
         <h6><a href="tel:+5511987474777" style={{color: "white", fontSize: "17px" }}>Central Atendimento</a></h6>
        </Link>
      </div>
      <Link onClick={logout} to="/">
        <i className="fa-solid fa-arrow-right-from-bracket"></i> 
        Logout
      </Link>
    </header>
  );
};

export default HeaderPage;
