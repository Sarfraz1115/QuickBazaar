import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchOverlay from "../components/Searchoverlay";
import "../CSS/Homee.css";
import { FaShoppingCart } from "react-icons/fa";
import BottomNav from "../components/Bottomnav";
import Hero from "../components/Hero";
import ShopCategories from "../components/Associated";
import AddToCartToast from "../components/AddToCartToast";
import CategoriesWithImages from "../components/Categories";
import DeliveryBanner from "../components/DeliveryBanner";

// Categories sequence mein jinko dikhana hai.
const FEATURED_CATEGORIES_SEQUENCE = [
  { key: ["Atta", "Rice", "Dal", "Salt"], title: "Atta, Rice & Dals" },
  { key: ["Oil", "Masala"], title: "Cooking Oils & Masala" },
  { key: ["Sweets"], title: "Sweet Delights" },
  { key: ["Detergent"], title: "Cleaning Essentials" },
  { key: ["Burger", "Pizza"], title: "Quick Fastfood" },
];

// Har baar kitni categories load karni hain
const CATEGORIES_TO_LOAD = 2;


const Home = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(CATEGORIES_TO_LOAD);
  const [isScrollingLoading, setIsScrollingLoading] = useState(false);

  const loadMoreRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, name: "" });

  const [allProductsFlat, setAllProductsFlat] = useState([]);


  // Data Fetching logic to group products by category
  useEffect(() => {
    setLoading(true);

    const fetchKirana = fetch("/data/Kiranaproducts.json").then((res) => res.json());
    const fetchFastfood = fetch("/data/Fastfood.json").then((res) => res.json());

    const flattenAndUniquifyData = (data, prefix) => {
      let products = [];

      // Handle data structure (array or object with category keys)
      if (Array.isArray(data)) {
        products = data;
      } else if (typeof data === 'object' && data !== null) {
        products = Object.values(data).flat();
      }

      // ✅ FIX: Create unique ID using a prefix and original ID
      return products.map(product => ({
        ...product,
        // ID will now be unique, e.g., "K:2" or "F:4"
        id: `${prefix}:${product.id}`,
      }));
    };


    Promise.all([fetchKirana, fetchFastfood])
      .then(([kiranaData, fastfoodData]) => {

        // 1. Uniquify and combine all products
        const kiranaProductsUnique = flattenAndUniquifyData(kiranaData, 'K');
        const fastfoodProductsUnique = flattenAndUniquifyData(fastfoodData, 'F');
        const allProducts = [...kiranaProductsUnique, ...fastfoodProductsUnique];

        // Store the flattened list for the Search Overlay to use
        setAllProductsFlat(allProducts);

        // 2. Group for Home Page display
        const grouped = FEATURED_CATEGORIES_SEQUENCE.reduce((acc, catConfig) => {
          const keys = Array.isArray(catConfig.key) ? catConfig.key : [catConfig.key];
          const topLevelKey = keys.join('_');

          const productsForGroup = allProducts
            .filter(product => keys.includes(product.category))
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);

          if (productsForGroup.length > 0) {
            acc[topLevelKey] = productsForGroup;
          }
          return acc;
        }, {});

        setGroupedProducts(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);


  // Intersection Observer for Infinite Scrolling (No Change)
  useEffect(() => {
    if (visibleCategoryCount >= FEATURED_CATEGORIES_SEQUENCE.length || showSearchOverlay || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isScrollingLoading) {
          setIsScrollingLoading(true);

          setTimeout(() => {
            setVisibleCategoryCount(prevCount => Math.min(
              prevCount + CATEGORIES_TO_LOAD,
              FEATURED_CATEGORIES_SEQUENCE.length
            ));
            setIsScrollingLoading(false);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        try { observer.unobserve(loadMoreRef.current); } catch (e) { /* ignore */ }
      }
    };
  }, [visibleCategoryCount, isScrollingLoading, showSearchOverlay, loading]);


  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ show: true, name: product.name });
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
    window.scrollTo(0, 0);
  };

  // Products filtered based on search state (used by SearchOverlay)
  const filteredProducts = allProductsFlat.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="home-container">
      <Header setShowSearchOverlay={setShowSearchOverlay} />
      {/* SearchBar ab overlay open karega */}
      <SearchBar
        setShowSearchOverlay={setShowSearchOverlay}
      />

      {/* Home Page Content: Sirf tab dikhega jab search overlay band ho */}
      {!showSearchOverlay && (
        <>
          {/* <Hero /> */}
          <CategoriesWithImages />
          <ShopCategories />

          {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Loading featured sections...</p>}

          {/* Featured Sections (Category-wise) */}
          {!loading && (
            <section className="featured-section">
              {FEATURED_CATEGORIES_SEQUENCE.slice(0, visibleCategoryCount).map((catConfig) => {
                const topLevelKey = Array.isArray(catConfig.key) ? catConfig.key.join('_') : catConfig.key;
                const products = groupedProducts[topLevelKey] || [];

                if (products.length === 0) return null;

                return (
                  // Product key mein ab unique ID use hogi
                  <div key={topLevelKey} className="category-product-block">
                    <div className="category-block-header">
                      <h3 className="category-block-title">{catConfig.title}</h3>
                      <button
                        className="see-all-btn"
                        onClick={() => navigate(`/category/${Array.isArray(catConfig.key) ? catConfig.key[0] : catConfig.key}`)}
                      >
                        See All
                      </button>
                    </div>

                    <div className="featured-products-grid">
                      {products.map((product) => (
                        // ✅ Product Card mein unique ID use karein
                        <div
                          key={product.id}
                          className="featured-product-card"
                          onClick={() => handleItemClick(product.id)}
                        >
                          <div className="featured-content">
                            <div className="featured-image-container">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="featured-image"
                              />
                            </div>
                            <div className="featured-info">
                              <div className="featured-title">{product.name}</div>
                              <div className="featured-price">₹{product.price}</div>
                            </div>
                          </div>
                          <button
                            className="add-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            <FaShoppingCart /> Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Loading Element for Infinite Scroll */}
          {!loading && (
            <div className="load-more-container" ref={loadMoreRef}>
              {isScrollingLoading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading more products...</p>
                </div>
              )}

              {visibleCategoryCount >= FEATURED_CATEGORIES_SEQUENCE.length && (
                <p style={{ color: '#888', padding: '20px' }}>You've reached the end of the featured products!</p>
              )}
            </div>
          )}
          <DeliveryBanner/>
          <BottomNav />
        </>
      )}

      {/* SearchOverlay ab unique product IDs use karega */}
      {showSearchOverlay && (
        <SearchOverlay
          search={search}
          setSearch={setSearch}
          filteredProducts={filteredProducts}
          setShowSearchOverlay={setShowSearchOverlay}
          navigate={navigate}
          addToCart={(product) => handleAddToCart(product)}
        />
      )}


      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default Home;