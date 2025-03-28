import React from "react";
import "./style.css";
import Button from "../Button";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <h1 className="logo">
        Billing App<span style={{color: "var(--blue)"}}>.</span>
      </h1>
      <div className="links">
        <NavLink to="/" className="link">
          <span>Home</span>
        </NavLink>
        <NavLink to="/Billing" className="link">
          <span>Billing</span>
        </NavLink>
        <NavLink  to="/dashboard" className="link">
          <Button 
            text={"Dashboard"} 
            outlined={true}
          />
        </NavLink>
      </div>
    </div>
  );
};


export default Header;
