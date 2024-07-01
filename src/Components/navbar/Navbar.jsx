// import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to={"/transactions"}>
        <h1 className="navbar__title">Budget App</h1>
      </Link>
      <Link to="/transactions/new">
        <div className="navbar__new">New Transaction</div>
      </Link>
    </nav>
  );
}
