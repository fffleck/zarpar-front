import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Button } from "react-bootstrap";

type ResultadoProps = {
  direcao: string;
  armador: string;
  porto: string;
  container: string;
  taxname: string;
  currency: string;
  taxValue: string;
  applicability: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultadosTaxas = (props: TabelaResultadosProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Mostra 20 itens por página
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<"container" | "currency" | null>(null); // Coluna selecionada para ordenar
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // Direção da ordenação

  // Função para alterar a coluna e a direção da ordenação
  const handleSort = (column: "container" | "currency") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc"); // Alterna a direção
    } else {
      setSortColumn(column);
      setSortDirection("asc"); // Reseta para ascendente ao trocar de coluna
    }
    setCurrentPage(1); // Reseta para a primeira página ao ordenar
  };

  // Função de comparação para ordenar os resultados
  const sortResults = (a: ResultadoProps, b: ResultadoProps) => {
    if (!sortColumn) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  };

  // Filtra e ordena os resultados com base no termo de busca e na ordenação
  const filteredResults = props.response
    .filter((resultado) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        resultado.armador.toLowerCase().includes(searchLower) ||
        resultado.porto.toLowerCase().includes(searchLower) ||
        resultado.taxname.toLowerCase().includes(searchLower) ||
        resultado.currency.toLowerCase().includes(searchLower)
      );
    })
    .sort(sortResults);

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

  let navigate = useNavigate();

  const routeNewTaxes = () =>{ 
    const path = "/taxesAdd";
    navigate(path);
  }

  const onAddTaxes = async (event) => {
    event.preventDefault()
    routeNewTaxes()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reseta para a primeira página ao buscar
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
    
      <Table striped bordered>
        <tr>
          <td width="70%">
            <Form.Group controlId="search">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar por Armador, Porto, Container, Name ou Currency"
              />
            </Form.Group>
          </td>
          <td  width="30%">
          </td>
        </tr>
      </Table>
      <Button onClick={onAddTaxes} className="btnNewTaxes"> New Tax </Button>
      
      <Table striped bordered style={{ width: "99%" }}>
        <thead>
          <tr>
            <th scope="col">Direção</th>
            <th scope="col">Armador</th>
            <th scope="col">Porto</th>
            <th scope="col" onClick={() => handleSort("container")}>
              Container {sortColumn === "container" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col">Name</th>
            <th scope="col" onClick={() => handleSort("currency")}>
              Currency {sortColumn === "currency" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col">Value</th>
            <th scope="col">Applicability</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((resultado, index) => (
            <tr key={index}>
              <td>{resultado.direcao}</td>
              <td>{resultado.armador}</td>
              <td>{resultado.porto}</td>
              <td>{resultado.container}</td>
              <td>{resultado.taxname}</td>
              <td>{resultado.currency}</td>
              <td>{resultado.taxValue}</td>
              <td>{resultado.applicability}</td>
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

export default TabelaResultadosTaxas;
