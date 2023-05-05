import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); // Obter o token a partir da rota
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("As senhas não correspondem.");
      return;
    }

    try {
      await api.post(`/auth/reset-password/${token}`, { password });

      setSuccessMessage("Senha redefinida com sucesso!");
      setPassword("");
      setPasswordConfirmation("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao redefinir a senha.");
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
    <div className="reset-password">
      <div className="reset-password-form">
        <div className="reset-password-form-wrapper">
          <div className="reset-password-title">
            <h2>Redefinir senha</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="reset-password-form-group">
              <label className="reset-password-form-label" htmlFor="password">
                Nova senha
              </label>
              <input
                className="reset-password-form-input"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="reset-password-form-group">
              <label
                className="reset-password-form-label"
                htmlFor="passwordConfirmation"
              >
                Confirme a nova senha
              </label>
              <input
                className="reset-password-form-input"
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" id="botao-login">
              Redefinir senha
            </button>
            {errorMessage && (
              <div className="reset-password-form-error">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="reset-password-form-success">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="reset-password-banner">
        <img src="../../imagens/proposito_reduzido.png" alt="" />
      </div>
    </div>
  );
};

export default ResetPassword;
