// src/components/SearchOverlay.jsx
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../CSS/overlay.css";

const SearchOverlay = ({
  search,
  setSearch,
  filteredProducts,
  setShowSearchOverlay,
  navigate,
  addToCart,
}) => {
  return (
    <div className="search-overlay">
      <div className="overlay-header">
        <FaArrowLeft
          className="overlay-back"
          onClick={() => setShowSearchOverlay(false)}
        />
        <input
          type="text"
          autoFocus
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="overlay-search-input"
        />
      </div>

      <div className="overlay-results">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overlay-result-card"
              onClick={() => {
                setShowSearchOverlay(false);
                navigate(`/item/${product.id}`);
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
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                + Add
              </button>
            </div>
          ))
        ) : (
          <p className="overlay-empty">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
