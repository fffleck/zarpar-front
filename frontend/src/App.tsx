import "./App.css";
import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import SucessoPedido from "./pages/Booking/SucessoPedido";
import Conta from "./pages/Conta";
import Cotacoes from "./pages/Cotacoes";
import Dashboard from "./pages/Dashboard";
import Pagamentos from "./pages/Pagamentos";
import Register from "./pages/Register";
import Protected from "./pages/Protected";
import api from "./services/api";

function App() {
  const [tokenIsValid, setTokenIsValid] = useState(false);

  const token = sessionStorage.getItem("access_token");

  api
    .get("/auth/verifytoken", {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        setTokenIsValid(true);
      } else {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user_email");
        setTokenIsValid(false);
      }
    })
    .catch((err) => {
      //tratativa de erro
    });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login isLoggedIn={tokenIsValid} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/booking"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Booking />
            </Protected>
          } 
        />
        <Route
          path="/pedido_resultado"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <SucessoPedido/>
            </Protected>
          }>
        </Route>
        <Route
          path="/conta"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Conta />
            </Protected>
          }
        />
        <Route
          path="/cotacoes"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Cotacoes />
            </Protected>
          }
        />

        {
          /*
            <Route
              path="/bookings"
              element={
                <Protected isLoggedIn={tokenIsValid}>
                  <Bookings />
                </Protected>
              } 
            />
            <Route
              path="/dashboard"
              element={
                <Protected isLoggedIn={tokenIsValid}>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/pagamentos"
              element={
                <Protected isLoggedIn={tokenIsValid}>
                  <Pagamentos />
                </Protected>
              }
            />
          
          */
        }

      </Routes>  
    </BrowserRouter>
  );
}

export default App;
