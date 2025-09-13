// src/components/Associated.jsx
import React from "react";
import "../CSS/associated.css";

const shops = [
  { id: 1, name: "Chidrewar Martt", img: "/Logo.png", link: "#" },
  { id: 2, name: "Bombaywala Foods", img: "/Logo.png", link: "#" },
  { id: 3, name: "Kailash Sweets", img: "/Logo.png", link: "#" },
  { id: 4, name: "Gujrat Sweet Home", img: "/Logo.png", link: "#" },
  // { id: 4, name: "Farm Fresh", img: "/Logo.png", link: "#" },
  // { id: 4, name: "Farm Fresh", img: "/Logo.png", link: "#" },
];

const Associated = () => {
  return (
    <div className="associated-container">
      <div className="associated-header">
        <h3>Associated Shops</h3>
        <a href="#" className="see-all">See all</a>
      </div>

      <div className="associated-scroll">
        {shops.map((shop) => (
          <a href={shop.link} key={shop.id} className="shop-card">
            <div className="shop-image">
              <img src={shop.img} alt={shop.name} />
            </div>
            <p className="shop-name">{shop.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Associated;
