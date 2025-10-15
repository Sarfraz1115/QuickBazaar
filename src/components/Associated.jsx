// src/components/Associated.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import karein
import "../CSS/associated.css";

const shops = [
  // Link ab zaroori nahi, hum 'name' ko URL parameter mein bhejenge
  { id: 1, name: "Chidrewar Mart", img: "/Logo.png" },
  { id: 2, name: "Bombaywala Foods", img: "/Logo.png" },
  { id: 3, name: "Kailash Sweets", img: "/Logo.png" },
  { id: 4, name: "Gujrat Sweet Home", img: "/Logo.png" },
];

const Associated = () => {
  const navigate = useNavigate(); // Hook use karein

  // Click handler jo user ko shop page par le jayega
  const handleShopClick = (shopName) => {
    // URL ko clean banane ke liye spaces ko underscore se replace karte hain
    const safeShopName = shopName.replace(/\s+/g, '_');
    // Naye shop page route par navigate karein
    navigate(`/shop/${safeShopName}`);
  };

  return (
    <div className="associated-container">
      <div className="associated-header">
        <h3>Associated Shops</h3>
        {/* Is link ko bhi navigate se theek kar sakte hain */}
        <span className="see-all" onClick={() => navigate('/all-shops')}>See all</span>
      </div>

      <div className="associated-scroll">
        {shops.map((shop) => (
          <div 
            key={shop.id} 
            className="shop-card" 
            // Ab click karne par handleShopClick call hoga
            onClick={() => handleShopClick(shop.name)} 
          >
            <div className="shop-image">
              <img src={shop.img} alt={shop.name} />
            </div>
            <p className="shop-name">{shop.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Associated;