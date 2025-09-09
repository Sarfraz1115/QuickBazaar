import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/Kiranaproducts";
import { useCart } from "../components/CartContext";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchOverlay from "../components/Searchoverlay";
import "../CSS/Homee.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import BottomNav from "../components/Bottomnav";
import Hero from "../components/Hero";

const Home = () => {
  const [search, setSearch] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 👇 Smooth scroll detect
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        setHideHeader(true); // hide header on scroll down
      } else {
        setHideHeader(false); // show header on scroll up
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <Header isHidden={hideHeader} />
      <SearchBar
        setShowSearchOverlay={setShowSearchOverlay}
        search={search}
      />

      <Hero />

      {/* Featured Products */}
      <section>
        <div className="section-title see-all">
          <span>Featured Products</span>
          <span className="see-all-link">See All</span>
        </div>
        <div className="featured-products-grid">
          {filteredProducts.slice(0, 8).map((product) => (
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
                  <FaHeart className="featured-heart" />
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
                  addToCart(product);
                }}
              >
                <FaShoppingCart /> Add
              </button>
            </div>
          ))}
        </div>
      </section>

      {showSearchOverlay && (
        <SearchOverlay
          search={search}
          setSearch={setSearch}
          filteredProducts={filteredProducts}
          setShowSearchOverlay={setShowSearchOverlay}
          navigate={navigate}
          addToCart={addToCart}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Home;
