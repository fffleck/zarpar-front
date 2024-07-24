import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); // Obter o token a partir da rota
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showFields, setshowFields] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("As senhas não correspondem.");
      return;
    }

    try {
      await api.post(`/auth/resetPassword/${token}`, { password });

      setSuccessMessage("Senha redefinida com sucesso!");
      setPassword("");
      setPasswordConfirmation("");
      setErrorMessage("");
      setshowFields(false);
    } catch (error) {
      setErrorMessage("O link é inválido ou expirou.");
      setshowFields(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirmation") {
      setPasswordConfirmation(value);
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src="/imagens/logo_home_2.jpeg" alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" role="dialog" id="modalSignin">
        <div style={{textAlign: "center"}} role="document">
                <img src="/imagens/logo+white.png"  width="250px" height="70px" alt="" />
              </div>
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header p-5 pb-4 border-bottom-0">
                <h4 className="card-title mb-4">Redefinir senha</h4>
              </div>

              <div className="modal-body p-5 pt-0">
                <form onSubmit={handleSubmit}>
                  {showFields && (
                    <div>
                      <div className="form-group">
                        <label className="mb-2" htmlFor="password">
                          Nova senha
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="reset-password-form-group">
                        <label className="mb-2 mt-4" htmlFor="passwordConfirmation">
                          Confirme a nova senha
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name="passwordConfirmation"
                          value={passwordConfirmation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-100 mb-2 btn btn-md rounded-3 btn-primary mt-4"
                        id="botao-login"
                      >
                        Redefinir senha
                      </button>
                    </div>
                  )}
                  {errorMessage && (
                    <div>
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                      <div className="text-center mt-3">
                        <Link to="/" className="text-decoration-none">
                          Voltar para o login
                        </Link>
                      </div>
                    </div>
                  )}
                  {successMessage && (
                    <div>
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                      <div className="text-center mt-3">
                        <Link to="/" className="text-decoration-none">
                          Voltar para o login
                        </Link>
                      </div>
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
    );

};

export default ResetPassword;
