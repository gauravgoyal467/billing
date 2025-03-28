import React from "react";
import Button from "../../Common/Button";
import "./style.css";
import billing from "../../../assets/billing.png";
import grad from "../../../assets/grad.png";
import { easeIn, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const MainSection = () => {
  return (
    <div className="mainSection">
      <div className="leftSection">
        <motion.h1
          className="section-heading"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: easeIn, duration: 1 }}
        >
          Billing &
        </motion.h1>
        <h1 className="section-heading-2">invoicing app</h1>
        <p>
          Used to generate bills.{" "}
        </p>
        <div className="button">
          <NavLink to="/dashboard">
            <Button
              text={"Dashboard"}
              outlined={false}
            />
          </NavLink>
        </div>
      </div>
      <div className="rightSection">
        <motion.img
          initial={{ y: -10 }}
          animate={{ y: +20 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            repeat: Infinity,
            duration: 2,
          }}
          src={billing}
          className="phone-img"
          alt=""
        />
        <img src={grad} className="gradient-img" alt="" />
      </div>
    </div>
  );
};

export default MainSection;
