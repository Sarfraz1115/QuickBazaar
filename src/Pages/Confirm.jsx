import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/confirmpage.css";
import { useCart } from "../components/CartContext";
import { saveOrder } from "../Utils/db" 
import { saveOrderToSheet } from "../Utils/googleSheet";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // generate 4-digit order id
    const id = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderId(id);

    const order = location.state;
    if (order) {
      const finalOrder = {
        ...order,
        orderId: id,
        createdAt: new Date().toISOString(),
      };

      // ✅ Save to IndexedDB
      saveOrder(finalOrder)
        .then(() => console.log("Order saved in IndexedDB"))
        .catch((err) => console.error("Failed to save order:", err));
        
        // save in google sheet
        saveOrderToSheet(finalOrder)
        .then(() => console.log("Order saved in Google Sheets"))
        .catch((err) => console.error("Failed to save order to Google Sheets:", err));
    };



  }, [ location.state]);

  const handleGoHome = () => {
    clearCart();
    navigate("/");
  };

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="icon-wrapper">
          <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#d1fae5" />
            <path
              d="M8 12.5l2.5 2.5L16 9.5"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="confirm-heading">Order Confirmed!</h2>
        <div className="confirm-text">
          Your Order ID: <b className="order-id">#{orderId}</b>
        </div>
        <div className="confirm-text">
          We will deliver your items soon.
        </div>
        <button className="go-home-button" onClick={handleGoHome}>
          Go to Home
        </button>
        <button
          className="view-orders-button"
          onClick={() => navigate("/orders")}
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default Confirm;
