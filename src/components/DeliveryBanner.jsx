import React, { useState, useEffect } from 'react';
import '../CSS/Categorycss/Deliverybanner.css'; 

const DeliveryBanner = () => {
  const [isFirstOrder, setIsFirstOrder] = useState(true);

  useEffect(() => {
    // Check local storage for the flag
    const hasOrdered = localStorage.getItem('hasPlacedOrder') === 'true';
    setIsFirstOrder(!hasOrdered);
  }, []);

  // IsFirstOrder: First Delivery Free
  // Second Order: Get free delivery over ₹299
  const bannerText = isFirstOrder
    ? "🎉 First Delivery FREE! Save Delivery Charges."
    : "💸 Get FREE Delivery on orders over ₹299!";
  
  const backgroundColor = isFirstOrder ? "#22c55e" : "#ffc107"; // Green for first, Yellow for second

  return (
    <div className="delivery-banner-wrapper">
      <div 
        className="delivery-banner" 
        style={{ backgroundColor: backgroundColor }}
      >
        <p className="banner-text">{bannerText}</p>
      </div>
    </div>
  );
};

export default DeliveryBanner;