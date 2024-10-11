import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./styles.css";

type ResultadoProps = {
  _id: string;
  mercadoria: string;
  tipo_mercadoria: string;
  tipo_container: string;
  porto_embarque: string;
  porto_descarga: string;
  armador: string;
  nome_navio: string;
  data_embarque: Date;
  tempo_de_transito: string;
  data_chegada: Date;
  base_freight: string;
  bunker: string;
  isps: string;
  transbordo: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultadosFretes = (props: TabelaResultadosProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Mostra 20 itens por página
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  let navigate = useNavigate();

  const routeNewFretes = () =>{ 
    const path = "/fretesAdd";
    navigate(path);
  }

  const onAddFrete = async (event) => {
    event.preventDefault()
    routeNewFretes()
  }


  // Filtra resultados com base no termo de busca e data de embarque
  const filteredResults = props.response.filter((resultado) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      resultado.porto_embarque.toLowerCase().includes(searchLower) ||
      resultado.porto_descarga.toLowerCase().includes(searchLower) ||
      resultado.armador.toLowerCase().includes(searchLower);

    const matchesDate = selectedDate
      ? moment(resultado.data_embarque).isSame(selectedDate, "day")
      : true;

    return matchesSearch && matchesDate;
  });

  // Cálculo de paginação
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const [pageGroup, setPageGroup] = useState(1); // Controla o grupo de 10 páginas
  const pagesPerGroup = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reseta para a primeira página ao buscar
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1); // Reseta para a primeira página ao filtrar por data
  };

  // Navegação de página: mostra um grupo de 10 páginas
  const startPage = (pageGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setPageGroup(pageGroup + 1);
      setCurrentPage(startPage + pagesPerGroup);
    }
  };

  const handlePrevGroup = () => {
    if (startPage > 1) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(startPage - pagesPerGroup);
    }
  };

  return (
    <>
    <Form>
    <Table striped bordered style={{ width: "99%" }}>
      <tr>
        <td>
          <Form.Group controlId="search">
            <Form.Label>Buscar</Form.Label>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por Porto Embarque, Porto Descarga ou Armador"
            />
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId="date">
            <Form.Label>Data de Embarque</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate || ""}
              onChange={handleDateChange}
              placeholder="Data de Embarque"
            />
          </Form.Group>
        </td>
      </tr>
    </Table>
    </Form>
    <Button onClick={onAddFrete} className="btnNewFrete"> New Frete </Button>
      <Table striped bordered style={{ width: "99%" }}>
        <thead>
          <tr>
            <th scope="col">Mercadoria</th>
            <th scope="col">Tipo Mercadoria</th>
            <th scope="col">Container</th>
            <th scope="col">Porto Embarque</th>
            <th scope="col">Porto Descarga</th>
            <th scope="col">Armador</th>
            <th scope="col">Navio</th>
            <th scope="col">Data Embarque</th>
            <th scope="col">Tempo Transito</th>
            <th scope="col">Data Chegada</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((resultado, index) => (
            <tr key={index}>
              <td>{resultado.mercadoria}</td>
              <td>{resultado.tipo_mercadoria}</td>
              <td>{resultado.tipo_container}</td>
              <td>{resultado.porto_embarque}</td>
              <td>{resultado.porto_descarga}</td>
              <td>{resultado.armador}</td>
              <td>{resultado.nome_navio}</td>
              <td>{moment(resultado.data_embarque).format("DD/MM/YYYY")}</td>
              <td>{resultado.tempo_de_transito}</td>
              <td>{moment(resultado.data_chegada).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={handlePrevGroup} disabled={startPage === 1}>
          Back
        </Pagination.Prev>

        {pageNumbers.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={handleNextGroup} disabled={endPage === totalPages}>
          Next
        </Pagination.Next>
      </Pagination>
    </>
  );
};

export default TabelaResultadosFretes;
