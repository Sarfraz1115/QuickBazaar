import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../CSS/search.css";

const SearchBar = ({ setShowSearchOverlay, search }) => {
  const suggestions = [
    "Search for rice",
    "Search for dal",
    "Search for fruits",
    "Search for snacks",
    "Search for milk",
    "Search for vegetables",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 3000); // 3 sec per phrase
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky-search-container">
      <div
        className="search-bar-container"
        onClick={() => setShowSearchOverlay(true)}
      >
        <FaSearch className="search-icon" />
        <div className="search-animated-text">
          <span key={index} className="slide-cycle">
            {suggestions[index]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
