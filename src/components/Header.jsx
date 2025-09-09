import React from "react";
import { FaBars, FaBell } from "react-icons/fa";
import "../CSS/Homee.css";

const Header = ({ isHidden }) => {
  return (
    <header className={`header ${isHidden ? "hide" : ""}`}>
      <FaBars className="menu-icon" />
      <h1 className="logo">QuickKirana</h1>
      <div className="right-icons">
        <div className="bell-icon-container">
          <FaBell className="bell-icon" />
          <span className="notif-badge">3</span>
        </div>
      </div>
    </header>
  );
};

export default Header;