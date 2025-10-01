import React, { useEffect, useState } from "react";
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
import Categories from "../components/Categories";
import AddToCartToast from "../components/AddToCartToast"; // ✅ import
import CategoriesWithImages from "../components/Categories";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ toast ke liye local state
  const [toast, setToast] = useState({ show: false, name: "" });

  useEffect(() => {
    fetch("/data/Kiranaproducts.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHideHeader(currentScroll > lastScrollY && currentScroll > 80);
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // ✅ common handler
  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ show: true, name: product.name });
  };

  return (
    <div className="home-container">
      <Header isHidden={hideHeader} />
      <SearchBar setShowSearchOverlay={setShowSearchOverlay} search={search} />

      <Hero />
      <ShopCategories />
      {/* <Categories /> */}
      <CategoriesWithImages/>

      <section>
        <div className="section-title see-all">
          <span>Featured Products</span>
          <span className="see-all-link">See All</span>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", margin: "20px 0" }}>
            Loading products...
          </p>
        ) : (
          <div className="featured-products-grid">
            {visibleProducts.map((product) => (
              <div className="featured-card-outer" key={product.id}>
                <div
                  className="featured-card-inner"
                  onClick={() => navigate(`/item/${product.id}`)}
                >
                  <div className="featured-img-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="featured-img"
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
                    handleAddToCart(product); // ✅ toast + cart
                  }}
                >
                  <FaShoppingCart /> Add
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && visibleCount < filteredProducts.length && (
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount(visibleCount + 10)}
          >
            Load More
          </button>
        )}
      </section>

      {showSearchOverlay && (
        <SearchOverlay
          search={search}
          setSearch={setSearch}
          filteredProducts={filteredProducts}
          setShowSearchOverlay={setShowSearchOverlay}
          navigate={navigate}
          addToCart={(product) => handleAddToCart(product)} // ✅ toast in search
        />
      )}

      <BottomNav />

      {/* ✅ Toast Component (global nahi, local use) */}
      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default Home;
