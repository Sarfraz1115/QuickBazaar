import React from 'react'
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../CSS/cart.css';

const Cart = () => {
    const { cart, updateQty, removeFromCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cart.reduce(
        (sum, item) => sum + (item.customPrice || item.price) * (item.calcQty || 1),
        0
    );
    const delivery = cart.length > 0 ? 5 : 0;
    const total = subtotal + delivery;

    return (
        <div className="cart-page">
            <header className="cart-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h2>Your Cart</h2>
            </header>

            {cart.length === 0 ? (
                <p className="empty-msg">Your cart is empty.</p>
            ) : (
                <div className="cart-list">
                    {cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <h4>{item.name}</h4>
                                <p className="item-price">₹{item.customPrice ? item.customPrice.toFixed(2) : item.price}</p>
                                {/* Show custom quantity if available */}
                                {typeof item.qty === "string" ? (
                                    <p className="item-qty">Qty: {item.displayQty}</p> 
                                ) : (
                                    <p className="item-qty">Qty: {item.displayQty}</p> 
                                )}
                                {item.note && <p className="item-note">Note: {item.note}</p>}
                            </div>
                            {typeof item.qty === "number" ? (
                                <div className="qty-controls">
                                    <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                </div>
                            ) : (
                                <div className="qty-controls">
                                    <span>{item.qty}</span>
                                </div>
                            )}
                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="cart-summary">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                        
                    </div>
                    <div className="summary-row">
                        <span>Delivery</span>
                        <span>₹{delivery.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    )
}

export default Cart;