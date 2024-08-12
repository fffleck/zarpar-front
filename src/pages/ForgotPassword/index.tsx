import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/auth/forgotPassword", { email });
      setIsEmailSent(true);
    } catch (err) {
      setError(
        "Houve um erro ao processar sua solicitação. Tente novamente mais tarde."
      );
    }
  }

  return (
    <div className="login-page">
      <div className="image-container">
        <img src="imagens/logo_home_2.jpeg" alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <div
          className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
          role="dialog"
          id="modalSignin"
        >
          
          <div className="modal-dialog" role="document">
            
            <div className="modal-content rounded-4 shadow">
              <div style={{textAlign: "center"}} role="document">
              <img src="imagens/logo_escura.png" width="250px" height="70px" alt="" />
              </div>
              <div className="modal-header p-5 pb-4 border-bottom-0">
                <h4 className="card-title mb-4">Recuperação de senha</h4>
              </div>

              <div className="modal-body p-5 pt-0">
                {isEmailSent ? (
                  <div className="alert alert-success" role="alert">
                    Um email foi enviado com instruções para redefinir sua senha.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="mb-2" htmlFor="email">
                        Endereço de email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button
                      type="submit"
                      className="w-100 mb-2 btn btn-md rounded-3 btn-primary mt-4"
                    >
                      Enviar email de recuperação
                    </button>
                    <div className="text-center mt-3">
                      <button className="btn btn-primary">
                        <Link to="/" className="text-decoration-none" style={{color: "white"}}>
                          Voltar para o login
                        </Link>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
