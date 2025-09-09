import React from "react";
import { FaSearch } from "react-icons/fa";
import "../CSS/Homee.css";

const SearchBar = ({ setShowSearchOverlay, search }) => {
  return (
    <div className="sticky-search-container">
      <div
        className="search-bar-container"
        onClick={() => setShowSearchOverlay(true)}
      >
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for groceries..."
          className="search-input"
          value={search}
          readOnly
        />
      </div>
    </div>
  );
};

export default SearchBar;