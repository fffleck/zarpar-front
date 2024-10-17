import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./styles.css";

type ResultadoProps = {
  port_name: string;
  port_code: string;
  country: string;
  lat: string;
  lon: string;
  lat_float: Float32List;
  lon_float: Float32List;
  port_id: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultadosPortos = (props: TabelaResultadosProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Mostra 20 itens por página
  const [searchTerm, setSearchTerm] = useState("");

  let navigate = useNavigate();

  const routeNewFretes = () =>{ 
    const path = "/portosAdd";
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
      resultado.port_name.toLowerCase().includes(searchLower) ||
      resultado.port_code.toLowerCase().includes(searchLower) ||
      resultado.country.toLowerCase().includes(searchLower) ||
      resultado.port_id.toLowerCase().includes(searchLower);

    return matchesSearch
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
    setCurrentPage(1);
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
              placeholder="Buscar por Name, Code, Country ou ID"
            />
          </Form.Group>
        </td>
      </tr>
    </Table>
    </Form>
    <Button onClick={onAddFrete} className="btnNewFrete"> New Porto </Button>
      <Table striped bordered style={{ width: "99%" }}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Country</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Latitude (graus)</th>
            <th scope="col">Longitude (graus)</th>
            <th scope="col">Id</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((resultado, index) => (
            <tr key={index}>
              <td>{resultado.port_name}</td>
              <td>{resultado.port_code}</td>
              <td>{resultado.country}</td>
              <td>{resultado.lat}</td>
              <td>{resultado.lon}</td>
              <td>{resultado.lat_float}</td>
              <td>{resultado.lon_float}</td>
              <td>{resultado.port_id}</td>
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

export default TabelaResultadosPortos;
