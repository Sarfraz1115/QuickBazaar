// src/components/CartContext.jsx - FIX: Quantity Handling & LocalStorage

import React, { createContext, useContext, useState, useEffect } from "react"; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from LocalStorage (with error handling)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('app_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to LocalStorage whenever 'cart' changes
  useEffect(() => {
    try {
      localStorage.setItem('app_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);


  // 💡 FIX: addToCart ab second parameter (qtyToAdd) lega, default value 1 hogi
  const addToCart = (product, qtyToAdd = 1) => {
    // Quantity ko number mein convert karo aur minimum 1 rakho taaki NaN aur 0 na ho
    const finalQtyToAdd = Math.max(1, parseInt(qtyToAdd, 10) || 1);

    setCart((prev) => {
      // 1. Check if item already exists
      const existingItem = prev.find((item) => item.id === product.id);

      // 2. If item exists, update its quantity
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + finalQtyToAdd } // Existing quantity mein nayi quantity add hogi
            : item
        );
      }

      // 3. If item is new, add it with the specified quantity
      // New item hamesha {..., qty: finalQtyToAdd} ke saath add hoga
      return [...prev, { ...product, qty: finalQtyToAdd }];
    });
  };

  // Quantity ko manually set ya adjust karne ke liye (Cart Page ke liye)
  const updateQty = (id, newQty) => {
    const finalNewQty = Math.max(1, parseInt(newQty, 10) || 1);
    
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: finalNewQty } : item
        )
        .filter((item) => item.qty > 0) // Item ko remove kar dega agar quantity 0 ya negative ho gayi
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total items count (BottomNav badge ke liye)
  const totalItems = cart.reduce((total, item) => total + (item.qty || 0), 0);


  const cartContextValue = {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    totalItems, // ✅ totalItems ko BottomNav ke liye export karein
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};