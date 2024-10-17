import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./styles.css";

type ResultadoProps = {
  idItem: string;
  name: string;
  weight: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultadosContainers = (props: TabelaResultadosProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Mostra 20 itens por página
  const [searchTerm, setSearchTerm] = useState("");
 
  let navigate = useNavigate();

  const routeNewFretes = () =>{ 
    const path = "/containersAdd";
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
      resultado.idItem.toLowerCase().includes(searchLower) ||
      resultado.name.toLowerCase().includes(searchLower)
      
    return matchesSearch
  });

  // Cálculo de paginação
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const [pageGroup, setPageGroup] = useState(1); 
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
              placeholder="Buscar por Id ou name"
            />
          </Form.Group>
        </td>
      </tr>
    </Table>
    </Form>
    <Button onClick={onAddFrete} className="btnNewFrete"> New Container </Button>
      <Table striped bordered style={{ width: "99%" }}>
        <thead>
          <tr>
            <th scope="col">Id Item</th>
            <th scope="col">Name</th>
            <th scope="col">Weight</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((resultado, index) => (
            <tr key={index}>
              <td>{resultado.idItem}</td>
              <td>{resultado.name}</td>
              <td>{resultado.weight}</td>
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

export default TabelaResultadosContainers;
