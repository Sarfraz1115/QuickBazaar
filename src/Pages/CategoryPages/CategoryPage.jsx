// src/Pages/CategoryPages/CategoryPage.jsx 

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../components/CartContext";
import AddToCartToast from "../../components/AddToCartToast";
import { FaArrowLeft } from "react-icons/fa";
import "../../CSS/Categorycss/attadal.css"; 

// Data Configuration imports
import { 
    TOP_CATEGORIES, 
    getTopCategoryBySubKey, 
    getSubCategoriesBySubKey 
} from "../../Utils/DataConfig"; 

const CategoryPage = () => {
  const { categoryKey } = useParams(); 
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [toast, setToast] = useState({ show: false, name: "" });
  const navigate = useNavigate();

  // Dynamic values nikalna: getSubCategoriesBySubKey function DataConfig se sirf relevant list deta hai
  const topCategoryKey = getTopCategoryBySubKey(categoryKey); 
  const subCategories = getSubCategoriesBySubKey(categoryKey); 
  const dataFilePath = topCategoryKey ? TOP_CATEGORIES[topCategoryKey].dataFile : null; 

  useEffect(() => {
    if (!dataFilePath || !categoryKey) {
        setProducts([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    
    // Fetching the structured JSON file
    fetch(dataFilePath) 
      .then((res) => {
          if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
      })
      .then((data) => {
        // FIX: Data array ko seedhe categoryKey se nikalna (Structured JSON format)
        // Agar category key file mein nahi hai, toh empty array milega
        const productsArray = data[categoryKey] || []; 
        
        setProducts(productsArray); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching products from ${dataFilePath} for key ${categoryKey}:`, err);
        setProducts([]);
        setLoading(false);
      });
  }, [categoryKey, dataFilePath]); 

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ show: true, name: product.name });
  };

  if (!topCategoryKey && !loading) {
      return <div className="category-layout" style={{padding: '20px'}}>
        <button onClick={() => navigate("/")}><FaArrowLeft /> Back to Home</button>
        <h3 style={{marginTop: '20px'}}>Error: Category Not Found for Key: {categoryKey}</h3>
      </div>;
  }

  return (
    <div className="category-layout">
      {/* Left Sidebar: Ab sirf relevant sub-categories (jaise Atta, Dal, Rice) hi dikhengi */}
      <div className="category-sidebar">
        {subCategories.map((cat) => (
          <div
            key={cat.key}
            className={`sidebar-category-item${cat.key === categoryKey ? " active" : ""}`}
            // Click karne par URL update hoga aur right bar mein naye products load honge
            onClick={() => navigate(`/category/${cat.key}`)} 
          >
            <img src={cat.image} alt={cat.name} className="sidebar-category-img" />
            <span className="sidebar-category-name">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Right Products Grid */}
      <div className="category-products-section">
        <div className="products-header">
          <button className="back-button" onClick={() => navigate("/")}> 
            <FaArrowLeft />
          </button>
          <span className="products-header-text">Delivery in 45 minutes</span>
        </div>
        
        <h2 className="category-title">
          {subCategories.find(c => c.key === categoryKey)?.name || categoryKey}
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found for "{subCategories.find(c => c.key === categoryKey)?.name || categoryKey}"</p>
        ) : (
          <div className="category-products-grid">
            {products.map((product) => (
              <div key={product.id} className="category-product-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default CategoryPage;