import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./style.css";
import api from "../../services/api";


const Login = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleInputEmail(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;

    setEmail(email);
  }

  function handleInputPassword(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;

    setPassword(password);
  }

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();


    const dataToSend = {
      userData: { email: email, password: password },
    };

    await api
      .post("/auth/login", dataToSend)
      .then((resp) => {
        if (resp.data.success) {
          sessionStorage.setItem("access_token", `Bearer ${resp.data.token}`);
          sessionStorage.setItem("user_email", resp.data.email);
          sessionStorage.setItem("name", resp.data.name);
          sessionStorage.setItem("qtsearch", resp.data.search);

          window.location.reload(); //a página é recarregada assim que o token é colocado na sessão
        } else {
          setLoginError(true);
        }
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          console.log(err.response.data.message);
        } else {
          console.log("Aconteceu um erro inesperado");
        }
        setLoginError(true);
      });
  }

  function loginVerify(loginError: boolean) {
    return loginError ? (
      <div className="alert alert-danger" role="alert">
        Erro ao logar
      </div>
    ) : null;
  }
  return (
    <div className="login-page">
      <div className="image-container">
        <img src="imagens/logo_home_2.jpeg" alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <div className="login-form">
          <div className="login-form-wrapper">
            
            <div style={{textAlign: "left"}}>
              <img src="imagens/logo_escura.png" width="250px" height="70px" alt="" />
            </div>
            <br /><br />
            <div className="login-title">
              <h2>Log In</h2>
              <Link to="/register">Inscreva-se</Link>
            </div>
            <form onSubmit={handleSubmitLogin}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleInputEmail}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={handleInputPassword}
                  required
                />
              </div>

              {loginVerify(loginError)}
              <Link className="forgot-password-link" to="/forgot-password">
                Esqueci minha senha
              </Link>
              <div className="form-group form-check">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="botao-login"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
