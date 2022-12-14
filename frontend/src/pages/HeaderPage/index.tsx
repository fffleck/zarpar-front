import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const HeaderPage = () => {
  return (
    <header>
      <Link to="/dashboard">
        {" "}
        <i className="fa-solid fa-bars"></i> Dashboard
      </Link>
      <Link to="/">
        {" "}
        <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
      </Link>
    </header>
  );
};

export default HeaderPage;
