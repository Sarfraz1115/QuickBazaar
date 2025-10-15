// src/components/Bottomnav.jsx - FIX: Cart Count Logic

import React from "react";
import { FaHome, FaShoppingCart, FaListAlt, FaUser } from "react-icons/fa"; // FaUser/FaListAlt/FaCompass jo bhi icon use karna ho
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext"; // ✅ useCart import zaroori hai
import "../CSS/bottom.css"; // ✅ CSS import zaroori hai

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 💡 FIX: totalItems ko useCart se nikalna (jo CartContext mein calculate ho raha hai)
  const { totalItems } = useCart(); 
  
  // Agar aap sirf `cart` array use kar rahe hain, toh yeh logic use karein:
  // const { cart } = useCart();
  // const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  return (
    <nav className="bottom-nav">
      {/* Home Button */}
      <button
        className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <FaHome />
        <span>Home</span>
      </button>

      {/* Categories/Shop Button (Aapki file mein yeh Orders tha) */}
      <button
        className={`nav-btn ${location.pathname.startsWith("/category") ? "active" : ""}`}
        // '/category/Atta' par navigate karein ya jahan aapki main categories list ho
        onClick={() => navigate("/category/Atta")} 
      >
        <FaListAlt /> 
        <span>Shop</span>
      </button>

      {/* Cart Button */}
      <button
        className={`nav-btn nav-cart ${location.pathname === "/cart" ? "active" : ""}`}
        onClick={() => navigate("/cart")}
      >
        <FaShoppingCart />
        <span>Cart</span>
        {/* 💡 FIX: Cart icon par totalItems dikhana */}
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {/* Orders/Account Button */}
      <button
        className={`nav-btn ${location.pathname === "/orders" ? "active" : ""}`}
        onClick={() => navigate("/orders")}
      >
        <FaUser /> {/* Ya koi aur icon jaise FaListAlt for Orders */}
        <span>Orders</span>
      </button>
    </nav>
  );
};

export default BottomNav;