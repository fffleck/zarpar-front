import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Form, Modal } from "react-bootstrap";
import {
  useTable,
  usePagination,
  useGlobalFilter,
} from "react-table";

interface ResponseItem {
  _id: string;
  quotationId: string;
  shipper: string;
  consignee: string;
  selectPortoEmbarque: string;
  selectPortoDescarga: string;
  selectMercadoria: string;
  qtdContainers: string;
  tipoContainer: string;
  total: string;
  data_embarque: string;
  armador: string;
  Currency: string;
  targetOceanFreight: string;
  valorCotado: string;
  status: string;
}

const ListNac = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseItem[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuotationId, setSelectedQuotationId] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (quotationId: string, id: string) => {
    setSelectedQuotationId(quotationId);
    setSelectedId(id);
    setShowModal(true);
  };

  const sendCotacaoNacAceita = async () => {
    const dataToSend = {
      quotationId: selectedQuotationId,
      id: selectedId,
    };

    if (validateFormData(dataToSend)) {
      try {
        await api.post('/quotations/finaliza', dataToSend);
        routeChange();
      } catch (error) {
        console.error("Ocorreu um problema ao editar o booking:", error);
      }
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  };

  const validateFormData = (data) => {
    return data.someField !== '';
  };

  const classButton = (status) => {
    if (status.toLowerCase() === "discarted") return "btn btn-warning botao";
    if (status.toLowerCase() === "selected") return "btn btn-danger botao";
    if (status.toLowerCase() === "quoted") return "btn btn-success botao";
    if (status.toLowerCase() === "pending") return "btn btn-secondary botao";
    return "";
  };

  const routeChange = () => { 
    navigate("/admin");
  };

  useEffect(() => {
    api.get(`quotations/lists/nac/${id}`).then(resp => {
      setResponse(resp.data.list);
    });
  }, [id]);

  // Configuração da tabela
  const columns = React.useMemo(() => [
    {
      Header: 'Quotation',
      accessor: 'quotationId',
      Cell: ({ cell }) => cell.value.substring(cell.value.length - 6),
    },
    {
      Header: 'Armador',
      accessor: 'armador',
    },
    {
      Header: 'Data',
      accessor: 'data_embarque',
    },
    {
      Header: 'Embarque',
      accessor: 'selectPortoEmbarque',
      Cell: ({ cell }) => cell.value.split("-")[0],
    },
    {
      Header: 'Destino',
      accessor: 'selectPortoDescarga',
      Cell: ({ cell }) => cell.value.split("-")[0],
    },
    {
      Header: 'Qtd',
      accessor: 'qtdContainers',
    },
    {
      Header: 'Containers',
      accessor: 'tipoContainer',
    },
    {
      Header: 'Valor NAC',
      accessor: 'targetOceanFreight',
    },
    {
      Header: 'Valor Cotado',
      accessor: 'valorCotado',
      Cell: ({ cell }) => cell.value ?? '-',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell }) => (
        <span className={classButton(cell.value)}>
          {cell.value}
        </span>
      ),
    },
    {
      Header: 'Ação',
      accessor: '_id',
      Cell: ({ row }) => (
        row.original.status === "Quoted" ? (
          <Button
            type="button"
            onClick={() => handleShowModal(row.original.quotationId, row.original._id)}
            className="botao btn-primary"
            title="Accept this quotation"
          >
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          </Button>
        ) : (
          <Button type="button" className="botao btn-secondary" title="Ação não disponível">
            <i className="fa fa-ban" aria-hidden="true"></i>
          </Button>
        )
      ),
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data: response,
      initialState: { pageSize: 5 }, // Define 5 registros por página
      globalFilter: globalFilter,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="admin" />
      <main>
        <HeaderPage nomeOpcao="Consolidate" />
        <div className="main-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              className="form-control w-50"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Buscar na tabela..."
            />
          </div>
          <div className="col-md-12">
            <section className="pedido-reserva">
              <div className="topo">
                <h2 className="titulo-secao">List Quotations NAC - {id.substring(id.length - 6)}</h2>
              </div>
              <div className="card center border-light" style={{ width: "95%", alignContent: "center" }}>
                <div className='card title' style={{ width: "100%", background: "#ccc", color: "#009", alignContent: "center" }}>
                  <h4>Cotação Solicitada</h4>
                </div>
                <table className="table table-bordered" {...getTableProps()}>
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>
                    Page{" "}
                    <strong>
                      {state.pageIndex + 1} de {pageOptions.length}
                    </strong>
                  </span>
                  <select
                    className="form-select w-auto"
                    value={state.pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    {[5, 10, 20].map((size) => (
                      <option key={size} value={size}>
                        View {size}
                      </option>
                    ))}
                  </select>
                  <div>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {"< Back"}
                    </button>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      {"Next >"}
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12 text-start">
                  <Link to="/dashboard">
                    <Button type="button" className="botao btn-primary">Voltar</Button>
                  </Link>
                  &nbsp;&nbsp;
                </div>
              </div>
            </section>
          </div>

          {/* Modal de confirmação */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Você tem certeza que deseja aceitar esta cotação?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => {
                sendCotacaoNacAceita();
                handleCloseModal();
              }}>
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ListNac;
