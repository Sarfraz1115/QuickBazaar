// header.jsx
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
// import "../CSS/Homee.css";
import "../CSS/header.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Sidebar from "./Sidebar";  // Sidebar import karo

const Header = ({ isHidden }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  // const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = cart.reduce(
  (sum, item) => sum + (typeof item.qty === "number" ? item.qty : 1),
  0
);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className={`header ${isHidden ? "hide" : ""}`}>
        <FaBars className="menu-icon" onClick={() => setSidebarOpen(true)} />
        <h1 className="logo">QuickKirana</h1>
        <div className="right-icons">
          <div className="bell-icon-container" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="bell-icon" />
            {cartCount > 0 && <span className="notif-badge">{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* Sidebar render */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
