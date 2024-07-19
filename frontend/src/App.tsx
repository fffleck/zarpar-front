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
import SucessoQuotation from "./pages/Nac/Sucesso/quotation_nac_success";
import ConsolidateBooking from "./pages/Consolida";

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
        <Route path="/" element={<Login isLoggedIn={tokenIsValid} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/booking" element={
            <Protected isLoggedIn={tokenIsValid}>
              <Booking />
            </Protected>
          }
        ></Route>
        
        <Route path="/pedido_resultado" element={
            <Protected isLoggedIn={tokenIsValid}>
              <SucessoPedido />
            </Protected>
          }
        >
        </Route>

        <Route path="/sucesso_quotation"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <SucessoQuotation />
            </Protected>
          }
        ></Route>

        <Route path="/conta"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Conta />
            </Protected>
          }>
        </Route>

        <Route path="/upload"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Upload />
            </Protected>
          }>
        </Route>
               
        <Route path="/edit/:id"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <EditBooking />
            </Protected>
          }
        ></Route>
        <Route path="/consolida/:id"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <ConsolidateBooking />
            </Protected>
          }
        ></Route>

        <Route path="/cotacoes"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Cotacoes />
            </Protected>
          }
        >
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Dashboard />
            </Protected>
          }
        >
        </Route>
        <Route path="/bookings"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Bookings />
            </Protected>
          } 
        >
        </Route>

        <Route path="/pagamentos"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Pagamentos />
            </Protected>
          }
        >
        </Route>

        <Route path="/admin"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Admin />
            </Protected>
          }
        >
        </Route>

        <Route path="/tracking"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Tracking />
            </Protected>
          }
        >
        </Route>

        <Route path="/demandas"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Demandas />
            </Protected>
          }
        >
        </Route>

        <Route path="/negociacoes"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Negociacoes />
            </Protected>
          }
        >
        </Route>

        <Route path="/impulsionar"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <Impulsionar />
            </Protected>
          }
        >
        </Route>

        <Route path="/nac"
          element={
            <Protected isLoggedIn={tokenIsValid}>
              <CotacoesNAC />
            </Protected>
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
