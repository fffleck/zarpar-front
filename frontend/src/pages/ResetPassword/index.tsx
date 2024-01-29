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
    <div
      className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
      role="dialog"
      id="modalSignin"
    >
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
  );

  //   return (
  //     <div className="reset-password">
  //       <div className="reset-password-form">
  //         <div className="reset-password-form-wrapper">
  //           <div className="reset-password-title">
  //             <h2>Redefinir senha</h2>
  //           </div>
  //           <form onSubmit={handleSubmit}>
  //             <div className="reset-password-form-group">
  //               <label className="reset-password-form-label" htmlFor="password">
  //                 Nova senha
  //               </label>
  //               <input
  //                 className="reset-password-form-input"
  //                 type="password"
  //                 name="password"
  //                 value={password}
  //                 onChange={handleInputChange}
  //                 required
  //               />
  //             </div>
  //             <div className="reset-password-form-group">
  //               <label
  //                 className="reset-password-form-label"
  //                 htmlFor="passwordConfirmation"
  //               >
  //                 Confirme a nova senha
  //               </label>
  //               <input
  //                 className="reset-password-form-input"
  //                 type="password"
  //                 name="passwordConfirmation"
  //                 value={passwordConfirmation}
  //                 onChange={handleInputChange}
  //                 required
  //               />
  //             </div>
  //             <button type="submit" className="btn btn-primary" id="botao-login">
  //               Redefinir senha
  //             </button>
  //             {errorMessage && (
  //               <div className="reset-password-form-error">{errorMessage}</div>
  //             )}
  //             {successMessage && (
  //               <div className="reset-password-form-success">
  //                 {successMessage}
  //               </div>
  //             )}
  //           </form>
  //         </div>
  //       </div>
  //       <div className="reset-password-banner">
  //         <img src="../../imagens/proposito_reduzido.png" alt="" />
  //       </div>
  //     </div>
  //   );
};

export default ResetPassword;
