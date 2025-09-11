import React from "react";
import { FaHome, FaShoppingCart, FaListAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import "../CSS/bottom.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  
  // const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = cart.reduce(
  (sum, item) => sum + (typeof item.qty === "number" ? item.qty : 1),
  0
);
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <FaHome />
        <span>Home</span>
      </button>
      <button
        className={`nav-btn ${location.pathname === "/cart" ? "active" : ""}`}
        onClick={() => navigate("/cart")}
      >
        <FaShoppingCart />
        <span>Cart</span>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
      <button
        className={`nav-btn ${location.pathname === "/orders" ? "active" : ""}`}
        onClick={() => navigate("/orders")}
      >
        <FaListAlt />
        <span>Orders</span>
      </button>
    </nav>
  );
};

export default BottomNav;
