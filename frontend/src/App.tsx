import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Conta from "./pages/Conta";
import Cotacoes from "./pages/Cotacoes";
import Dashboard from "./pages/Dashboard";
import Pagamentos from "./pages/Pagamentos";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/cotacoes" element={<Cotacoes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
