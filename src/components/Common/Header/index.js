import React from "react";
import "./style.css";
import Button from "../Button";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="nav">
      <h1 className="logo">
        Billing App<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <nav className="links">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/billing" className="link" >
          Billing
        </NavLink>
        <NavLink to="/dashboard" className="link">
          <Button text="Dashboard" outlined />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
