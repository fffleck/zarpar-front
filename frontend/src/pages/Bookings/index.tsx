import React from "react";
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { Link } from "react-router-dom";
import "./styles.css";

const Bookings = () => {
  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="bookings"/>
      <main>
        <HeaderPage nomeOpcao="Bookings"/>
        <div className="main-content">
          <div className="main-content-title">
            <h2>Bookings</h2>
            <div className="table">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Pedido</th>
                    <th scope="col">Booking</th>
                    <th scope="col">Navio</th>
                    <th scope="col">D/L Draft</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>68451385</td>
                    <td>Cap San Antonio 222R</td>
                    <td>22/04/22 18h</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>68451385</td>
                    <td>Cap San Antonio 222R</td>
                    <td>22/04/22 18h</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>68451385</td>
                    <td>Cap San Antonio 222R</td>
                    <td>22/04/22 18h</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;
