import React, { useState } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "../CSS/header.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = ({ isHidden }) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // ✅ Cart count logic same rakha
  const cartCount = cart.reduce(
    (sum, item) => sum + (typeof item.qty === "number" ? item.qty : 1),
    0
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className={`header ${isHidden ? "hide" : ""}`}>
        {/* Left side → Delivery time + App name */}
        <div className="header-left">
          <h2 className="delivery-time">Delivery in 40 mins</h2>
          <p className="app-name">QuickKirana</p>
        </div>

        {/* Right side → Cart + Profile */}
        <div className="header-right">
          {/* <div
            className="cart-icon-container"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="notif-badge">{cartCount}</span>}
          </div> */}

          <FaUserCircle
            className="profile-icon"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </header>

      {/* Sidebar render */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
