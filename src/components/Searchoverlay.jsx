// src/components/SearchOverlay.jsx (Pura aur Final Code)

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../CSS/overlay.css";
// ✅ Home.jsx se aane waale toast logic ke liye AddToCartToast ka import zaroori hai
import AddToCartToast from "./AddToCartToast"; 

const SearchOverlay = ({
  search,
  setSearch,
  filteredProducts,
  setShowSearchOverlay,
  navigate,
  addToCart, // Home.jsx se aane waala addToCart function
}) => {
  // Search Overlay ke andar toast dikhane ke liye local state
  const [toast, setToast] = useState({ show: false, name: "" });

  // Home.jsx ke addToCart function ko call karta hai aur local toast state set karta hai
  const handleAddToCart = (product) => {
    // Ye function Home.jsx ke global addToCart ko call karega
    addToCart(product); 
    // Aur iske apne local toast ko dikhayega
    setToast({ show: true, name: product.name });
  };

  return (
    <div className="search-overlay">
      <div className="overlay-header">
        <FaArrowLeft
          className="overlay-back"
          onClick={() => {
             setShowSearchOverlay(false);
             setSearch(""); // Overlay band karte waqt search input bhi clear ho jayega
          }}
        />
        <input
          type="text"
          autoFocus
          placeholder="Search for products, brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="overlay-search-input"
        />
      </div>

      <div className="overlay-results">
        {/* Agar search empty hai, to kuch message dikhao */}
        {search === "" && (
             <p className="overlay-empty">Type something to search...</p>
        )}

        {/* Agar search mein results mile hain */}
        {search !== "" && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              // ✅ FIX: product.id ab unique hai, isse key error solve ho jayega
              key={product.id} 
              className="overlay-result-card"
              onClick={() => {
                setShowSearchOverlay(false); // Item page par jane se pehle overlay band ho
                navigate(`/item/${product.id}`); // Unique ID ke saath navigate karo
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="overlay-result-img"
              />
              <div className="overlay-result-info">
                <p className="overlay-result-name">{product.name}</p>
                <p className="overlay-result-price">₹{product.price}</p>
              </div>
              <button
                className="overlay-add-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Card click event ko roko
                  handleAddToCart(product); // Add to Cart functionality
                }}
              >
                + Add
              </button>
            </div>
          ))
        ) : 
        
        // Agar search mein koi results nahi mile
        (search !== "" && filteredProducts.length === 0) && (
          <p className="overlay-empty">No results found for "{search}"</p>
        )}
      </div>

      {/* ✅ AddToCart Toast Component */}
      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default SearchOverlay;