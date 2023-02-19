import React, { ChangeEvent, FormEvent, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";


const Login = () => {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState('');

  function handleInputEmail(event: ChangeEvent<HTMLInputElement>){
    const email = event.target.value;
    
    setEmail(email);
  }

  function handleInputPassword(event: ChangeEvent<HTMLInputElement>){
    const password = event.target.value;

    setPassword(password);
  }

  async function handleSubmitLogin(event: FormEvent){
    event.preventDefault();

    const data = {email: email, password: password};

    await api.post('/login', data).catch(()=>{});

  }


  return (
    <div id="login-page">
      <div className="login">
        <div className="login-form">
          <div className="login-form-wrapper">
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
              <div className="form-group form-check">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="banner-login">
          <img src="imagens/proposito_reduzido.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
