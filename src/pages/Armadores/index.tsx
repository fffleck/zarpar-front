import React, { useState, useEffect } from "react";
import HeaderPage from "../HeaderPage";
import Sidebar from "../Sidebar";
import { Button, Form, Table, ToggleButton, ButtonGroup, Modal } from "react-bootstrap";
import api from "../../services/api";

const Armadores = () => {
  // State para controlar login, senha, status e se foi salvo
  const [armadoresData, setArmadoresData] = useState([
    { nome_armador: "CmaCgm", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Cosco", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Evergreen", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Hapag", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Hmm", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Maersk", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Msc", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "One", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Pil", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Yangming", login: "", password: "", status: false, isSaved: true },
    { nome_armador: "Zim", login: "", password: "", status: false, isSaved: true },

  ]);

  // State para controlar o modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchArmadoresData = async () => {
      const email = sessionStorage.getItem("user_email");
      try {
        const response = await api.post("/armadores/list", { email });
        const armadores = response.data.list;

        setArmadoresData(prevData =>
          prevData.map(armador => {
            const armadorData = armadores.find(a => a.armador === armador.nome_armador);

            return armadorData
              ? { 
                  ...armador, 
                  login: armadorData.user, 
                  password: armadorData.password, 
                  status: armadorData.status, 
                  isSaved: true
                }
              : armador;
          })
        );
      } catch (error) {
        console.error("Erro ao buscar dados dos armadores:", error);
        handleShowModal("Erro", "Erro ao buscar dados dos armadores.");
      }
    };

    fetchArmadoresData();
  }, []);

  const handleStatusChange = (index) => {
    const newArmadoresData = [...armadoresData];
    newArmadoresData[index].status = !newArmadoresData[index].status;
    newArmadoresData[index].isSaved = false; 
    setArmadoresData(newArmadoresData);
  };

  const handleInputChange = (index, field, value) => {
    const newArmadoresData = [...armadoresData];
    newArmadoresData[index][field] = value;
    newArmadoresData[index].isSaved = false;
    setArmadoresData(newArmadoresData);
  };

  const handleSave = async (index) => {
    const { nome_armador, login, password, status } = armadoresData[index];
    const email = sessionStorage.getItem("user_email");
    
    try {
      await api.post("/armadores/save", {
        nome_armador,
        email,
        login,
        password,
        status
      });

      const newArmadoresData = [...armadoresData];
      newArmadoresData[index].isSaved = true;
      setArmadoresData(newArmadoresData);

      handleShowModal("Sucesso", `Dados do armador ${nome_armador} salvos com sucesso!`);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      handleShowModal("Erro", `Erro ao salvar os dados do armador ${nome_armador}.`);
    }
  };

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="armadors" />
      <main>
        <HeaderPage nomeOpcao="Armadores" />
        <div className="main-content">
          <div className="main-content-title">
            <h2>Armadores</h2>
            <Table striped bordered>
              <thead>
                <tr>
                  <th scope="col">Armador</th>
                  <th scope="col">Login</th>
                  <th scope="col">Senha</th>
                  <th scope="col">Ação</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {armadoresData.map((armador, index) => (
                  <tr key={armador.nome_armador}>
                    <td>
                      <img
                        src={`/imagens/armadores/${armador.nome_armador}.png`}
                        width="110px"
                        height="90px"
                        alt={`Armador ${armador.nome_armador}`}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={armador.login}
                        onChange={(e) =>
                          handleInputChange(index, "login", e.target.value)
                        }
                        className="selecao"
                        aria-required="true"
                        aria-describedby={`login${armador.nome_armador}`}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="password"
                        value={armador.password}
                        onChange={(e) =>
                          handleInputChange(index, "password", e.target.value)
                        }
                        className="selecao"
                        aria-required="true"
                        aria-describedby={`passwd${armador.nome_armador}`}
                      />
                    </td>
                    <td>
                      <Button
                        type="submit"
                        className="botao"
                        name={`Salvar_${armador.nome_armador}`}
                        onClick={() => handleSave(index)}
                        disabled={armador.isSaved}
                      >
                        {armador.isSaved ? "Salvo" : "Salvar"}
                      </Button>
                    </td>
                    <td>
                      <ButtonGroup>
                        <ToggleButton
                          type="checkbox"
                          variant={armador.status ? "success" : "secondary"}
                          checked={armador.status}
                          value="1"
                          onClick={() => handleStatusChange(index)}
                        >
                          {armador.status ? "On" : "Off"}
                        </ToggleButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Armadores;
