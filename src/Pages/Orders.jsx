import React, { useEffect, useState } from "react";
import { getOrders } from "../Utils/db";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../CSS/orders.css"; // apna CSS file rakho

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders().then((res) => setOrders(res));
  }, []);

  return (
    <div className="orders-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-msg">You have no previous orders.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order.orderId}</span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * (typeof item.qty === "number" ? item.qty : 1)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total:</strong> ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
