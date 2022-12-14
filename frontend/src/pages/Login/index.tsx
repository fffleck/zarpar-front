import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div id="login-page">
      <div className="login">
        <div className="login-form">
          <div className="login-form-wrapper">
            <div className="login-title">
              <h2>Log In</h2>
              <a href="views/register.html">Inscreva-se</a>
            </div>
            <form action="/dashboard">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group form-check"></div>
              <Link to="/dashboard">
                <button type="button" className="btn btn-primary">
                  Login
                </button>
              </Link>
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
