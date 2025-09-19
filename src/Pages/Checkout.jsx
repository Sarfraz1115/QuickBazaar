// Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../CSS/checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // ✅ Load saved user info on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) {
      setName(savedUser.name || "");
      setPhone(savedUser.phone || "");
      setAddress(savedUser.address || "");
    }
  }, []);


  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.customPrice || item.price) * (typeof item.qty === "number" ? item.qty : 1);
  }, 0);



  const delivery = cart.length > 0 ? 5 : 0;
  const total = subtotal + delivery;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const userInfo = { name, phone, address };
    // ✅ Save info for future use
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    const order = {
      items: cart,
      ...userInfo,
      subtotal,
      delivery,
      total,
    };

    navigate('/confirm', { state: order });
  };

  return (
    <div className="checkout-page">
      <header className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 className="checkout-title">Checkout</h2>
      </header>

      <div className="checkout-container">
        {/* Order Summary */}
        <h3 className="section-heading">Order Summary</h3>
        <div className="summary-box">
          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <div>
                <div className="item-name">{item.name}</div>
                {/* <div className="item-details">Qty: {item.qty}</div> */}
                <div className="item-details">Qty: {item.qty}</div>
                {item.note && <div className="item-note">Note: {item.note}</div>}
              </div>
              <div className="item-price">
                ₹{((item.customPrice ? item.customPrice : item.price) * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="summary-row-total">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Information */}
        <h3 className="section-heading">Delivery Information</h3>
        <form onSubmit={handlePlaceOrder}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
          />
          <textarea
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-textarea"
          />

          {/* Payment Summary */}
          <h3 className="section-heading">Payment Summary</h3>
          <div className="summary-box">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span>₹{delivery.toFixed(2)}</span>
            </div>
            <div className="summary-row-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
