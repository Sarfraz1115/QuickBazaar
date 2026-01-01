
import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext'; 
import '../CSS/Categorycss/Deliverybanner.css'; 

const FREE_DELIVERY_THRESHOLD = 299; 

const DeliveryBanner = () => {
  const { cart } = useCart();
  const [isFirstOrder, setIsFirstOrder] = useState(true);

  // Cart ka subtotal calculate karein
  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.customPrice || item.price) * (typeof item.qty === "number" ? item.qty : 1);
  }, 0);

  useEffect(() => {
    // Check local storage for the flag
    const hasOrdered = localStorage.getItem('hasPlacedOrder') === 'true';
    setIsFirstOrder(!hasOrdered);
  }, []);

  let bannerText;
  let progressPercentage;
  let backgroundColor; 
  let progressColor;   
  
  // Unique Colors
  const COLOR_SUCCESS_BG = "#22c55e"; // Green for success
  const COLOR_SUCCESS_FILL = "#1d9346";
  const COLOR_PROGRESS_BG = "#498f6cff"; // Unique Blue-Grey background
  const COLOR_PROGRESS_FILL = "#a3c5ed"; // Light Blue/Teal fill 

  if (isFirstOrder || subtotal >= FREE_DELIVERY_THRESHOLD) {
    // 1. Success State (First Order ya Goal Achieved)
    bannerText = isFirstOrder 
        ? "🎉 First Delivery FREE! Place your order now."
        : "✅ Delivery is FREE! You saved the delivery charge.";
    progressPercentage = 100;
    backgroundColor = COLOR_SUCCESS_BG; 
    progressColor = COLOR_SUCCESS_FILL; 
    
  } else {
    // 2. Progressing State (Subsequent Order, Goal not met)
    const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
    
    // Live remaining amount dikhana (Even if subtotal is 0, it will show "Add ₹299 more...")
    bannerText = `🛒 Add ₹${remaining.toFixed(0)} more to get FREE Delivery!`;
    
    // Progress calculation
    progressPercentage = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
    
    // Ensure bar is visible but not too tiny when progress > 0
    if (subtotal > 0 && progressPercentage < 5) {
        progressPercentage = 5;
    }
    
    // New Colors Apply Kiye
    backgroundColor = COLOR_PROGRESS_BG; 
    progressColor = COLOR_PROGRESS_FILL; 
  }

  // Component hamesha render hoga, isliye koi 'return null' check nahi hai.
  return (
    <div className="delivery-banner-wrapper">
      <div 
        className="delivery-banner" 
        style={{ backgroundColor: backgroundColor }}
      >
        <p className="banner-text">{bannerText}</p>
        
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${progressPercentage}%`, 
              backgroundColor: progressColor 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBanner;