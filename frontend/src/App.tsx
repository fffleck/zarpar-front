import "./App.css";
import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import SucessoPedido from "./pages/Booking/SucessoPedido";
import Conta from "./pages/Conta";
import Cotacoes from "./pages/Cotacoes";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Register from "./pages/Register";
import Protected from "./pages/Protected";
import api from "./services/api";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import EditBooking from "./pages/Edit";
import Pagamentos from "./pages/Pagamentos";
import Admin from "./pages/Admin";
import Tracking from "./pages/Tracking";
import Demandas from "./pages/Demandas";
import Negociacoes from "./pages/Negociacoes";
import Impulsionar from "./pages/Impulsionar";
import CotacoesNAC from "./pages/Nac";

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login isLoggedIn={tokenIsValid} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Booking />
            </Protected>
          }
        />
        <Route path="/pedido_resultado"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <SucessoPedido />
            </Protected>
          }
        ></Route>
        <Route path="/conta"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Conta />
            </Protected>
          }
        />
         <Route path="/upload"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Upload />
            </Protected>
          }
        />      
        <Route path="/edit/:id"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <EditBooking />
            </Protected>
          }
        />
        <Route path="/cotacoes"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Cotacoes />
            </Protected>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/bookings"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Bookings />
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

        <Route
          path="/admin"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Admin />
            </Protected>
          }
        />

        <Route
          path="/tracking"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Tracking />
            </Protected>
          }
        />

        <Route
          path="/demandas"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Demandas />
            </Protected>
          }
        />

        <Route
          path="/negociacoes"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Negociacoes />
            </Protected>
          }
        />

        <Route
          path="/impulsionar"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Impulsionar />
            </Protected>
          }
        />

        <Route
          path="/nac"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <CotacoesNAC />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
