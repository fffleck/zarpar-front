import "./styles.css";
import { Link } from "react-router-dom";

const HeaderPage = (props) => {

  function logout(){
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_email");
    window.location.reload(); //recarrega a página assim que o token é retirado da sessão
  }

  const nomeAba = props.nomeOpcao;

  return (
    <header>
      <Link to="/cotacoes">
        {" "}
        <i className="fa-solid fa-bars"></i>{nomeAba}
      </Link>
      <Link onClick={logout} to="/">
        <i className="fa-solid fa-arrow-right-from-bracket"></i> 
        Logout
      </Link>
    </header>
  );
};

export default HeaderPage;
