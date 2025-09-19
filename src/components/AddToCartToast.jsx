// src/components/AddToCartToast.jsx
import React, { useEffect } from "react";
import "../CSS/addToCartToast.css";

const AddToCartToast = ({ show, onClose, itemName }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // auto-hide after 2s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="add-to-cart-toast">
      ✅ {itemName} added to cart
    </div>
  );
};

export default AddToCartToast;
