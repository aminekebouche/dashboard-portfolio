import React from "react";
import { NavLink } from "react-router-dom";
import "./leftbar.scss";

const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="leftbar-top">
        <img src="/images/logo2.png" alt="" />
        <h1>Mon portfolio</h1>
      </div>
      <div className="leftbar-menu">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/service">Service</NavLink>
        <NavLink to="/skill">Compétence</NavLink>
        <NavLink to="/projet">Projet</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </div>
    </div>
  );
};

export default Leftbar;
