// src/components/Categories.jsx (Update this file)

import { useNavigate } from "react-router-dom";
import "../CSS/categories.css";
// Data Configuration import
import { TOP_CATEGORIES } from "../Utils/DataConfig"; 
// Dummy images (aapko apne paths set karne honge)
import AttaDal from "/attadal.png"; 
import Masala from "/masala.png";
import FastFood from "/munchies.png";
import cleaning from "/cleaning.png";
import sweets from "/sweets.jpg";
import oilghee from "/oilghee.png"
import dairy from "/dairybread.png"


const CategoriesWithImages = () => {
  const navigate = useNavigate();

  const categories = Object.keys(TOP_CATEGORIES).map(key => ({
      key: key,
      // Existing name from DataConfig (Can be used as fallback or tooltip)
      name: TOP_CATEGORIES[key].name,
      // Custom Name set karna
      customName:
        key === 'atta_dal_rice' ? 'Atta & Rice' :
        key === 'oils_masala' ? 'Oil, Ghee & Masala' :
        key === 'fastfood' ? 'Ready-to-Eat' :
        key === 'dairy' ? 'Dairy, Bread & Eggs' :
        key === 'Sweets' ? 'Mithai & Snacks' :
        key === 'Detergents' ? 'Home Cleaning' : 'Other Groceries', // Default Custom Name
      // Image key ke hisaab se set karna
      image:
        key === 'atta_dal_rice' ? AttaDal :
        key === 'oils_masala' ? oilghee :
        key === 'fastfood' ? FastFood :
        key === 'Sweets' ? sweets :
        key === 'dairy' ? dairy : // Default Image
        key === 'Detergents' ? cleaning : AttaDal // Default Image
  }));

  const handleCategoryClick = (topCategoryKey) => {
    // Top-Level key (e.g., 'atta_dal_rice') se uski default sub-category nikalna
    const defaultSubKey = TOP_CATEGORIES[topCategoryKey].defaultSubKey;
    if(defaultSubKey) {
        // Ab hum us default sub-category par jayenge (e.g., /category/Atta)
        navigate(`/category/${defaultSubKey}`);
    }
  };

  return (
    <div className="categories-container">
      <div className="category-header">
        <h3> Shop By Category</h3>
      </div>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => handleCategoryClick(category.key)}
          >
            <div className="category-image-container">
              <img src={category.image} alt={category.name} className="category-image" />
            </div>
           <p className="category-name-text">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesWithImages;