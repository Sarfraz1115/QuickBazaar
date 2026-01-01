import React, { useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import "../CSS/header.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = ({ isHidden, setShowSearchOverlay }) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [hide, setHide] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr > 60 && curr > lastScroll) {
        setHide(true); // Scroll down → hide
      } else {
        setHide(false); // Scroll up → show
      }
      setLastScroll(curr);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);


  // ✅ Cart count logic same rakha
  const cartCount = cart.reduce(
    (sum, item) => sum + (typeof item.qty === "number" ? item.qty : 1),
    0
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className={`header ${hide ? "hide" : ""}`}>
        {/* Left side → Delivery time + App name */}
        <div className="header-left">
          <h2 className="delivery-time">Delivery in 60 mins</h2>
          <p className="app-name">QuickKirana</p>
        </div>

        {/* Right side → Cart + Profile */}
        <div className="header-right">
          <div className="headsearch"
            onClick={() => setShowSearchOverlay(true)}>
            <FaSearch className="search"/>
          </div>
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
