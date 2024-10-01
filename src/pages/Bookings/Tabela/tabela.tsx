import React, { useState, useMemo } from "react";
import Table from "react-bootstrap/Table";
import ResultadoBooking from "../Resultado";
import { Form, Pagination, Row, Col } from "react-bootstrap";
import '../styles.css'; 

type ResultadoProps = {
  _id: string;
  armador: string;
  cliente: string;
  data_embarque: string;
  embarcador_email: string;
  porto_embarque: string;
  porto_descarga: string;
  selectMercadoria: string;
  tipo_container: string;
  qtdContainers: string;
  email: string;
  status: string;
  oceanFreigth: string;
  created_at: string;
  bookingFile: string;
  blFile: string;
};

type TabelaResultadosProps = {
  response: Array<ResultadoProps>;
};

const TabelaResultados = (props: TabelaResultadosProps) => {
  const email = sessionStorage.getItem("user_email");
  const isAdmin = email === 'ffleck@gmail.com' || email === 'alvaro@karavel.com';

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return props.response.filter((resultado) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (resultado.armador?.toLowerCase() || "").includes(searchLower) ||
        (isAdmin && (resultado.cliente?.toLowerCase() || "").includes(searchLower)) ||
        (resultado.porto_embarque?.toLowerCase() || "").includes(searchLower) ||
        (resultado.porto_descarga?.toLowerCase() || "").includes(searchLower) ||
        (resultado.status?.toLowerCase() || "").includes(searchLower)
      );
    });
  }, [searchTerm, props.response, isAdmin]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderColunas = () => (
    <>
      <th scope="col">#Order</th>
      {isAdmin && <th scope="col">Client</th>}
      <th scope="col">Armador</th>
      <th scope="col">Qtd Containers</th>
      <th scope="col">ETS</th>
      <th scope="col">POL</th>
      <th scope="col">POD</th>
      <th scope="col">Data Criação</th>
      <th scope="col">Moeda</th>
      <th scope="col">Valor</th>
      <th scope="col">Status</th>
      <th scope="col">File BK</th>
      <th scope="col">File BL</th>
      <th scope="col">#</th>
    </>
  );

  return (
    <div>
      <Row className="mb-3">
        <Col className="text-right">
          <Form.Group controlId="searchTerm">
            <Form.Label className="sr-only">Buscar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>
        </Col>
      </Row>

      <Table striped bordered>
        <thead>
          <tr>{renderColunas()}</tr>
        </thead>
        <tbody>
          {currentItems.map((resultado) => (
            <ResultadoBooking
              key={resultado._id}
              id={resultado._id}
              cliente={isAdmin ? resultado.email : undefined}
              armador={resultado.armador}
              quantidade_containers={resultado.qtdContainers}
              data_embarque={resultado.data_embarque}
              porto_embarque={resultado.porto_embarque}
              porto_descarga={resultado.porto_descarga}
              status={resultado.status}
              email={email}
              bookingFile={resultado.bookingFile}
              blFile={resultado.blFile}
              oceanFreigth={resultado.oceanFreigth} 
              tipo_mercadoria={""} 
              tipo_container={""} 
              valor={""} 
              created_at={resultado.created_at}            
            />
          ))}
        </tbody>
      </Table>

      <div className="pagination-container">
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default TabelaResultados;
