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
      await api.post("/auth/forgotpassword", { email });
      setIsEmailSent(true);
    } catch (err) {
      setError(
        "Houve um erro ao processar sua solicitação. Tente novamente mais tarde."
      );
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Recuperação de senha</h4>
              {isEmailSent ? (
                <div className="alert alert-success" role="alert">
                  Um email foi enviado com instruções para redefinir sua senha.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Endereço de email</label>
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
                    className="btn btn-primary btn-block mt-4"
                  >
                    Enviar email de recuperação
                  </button>
                  <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none">
                      Voltar para o login
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
