import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import "../CSS/itemPage.css";
import AddToCartToast from "../components/AddToCartToast"; // ✅ import

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState({ show: false, name: "" }); // ✅ toast state

  // ✅ Load products from JSON
  useEffect(() => {
    fetch("/data/Kiranaproducts.json")
      .then((res) => res.json())
      .then((data) => {
        const flatData = Array.isArray(data[0]) ? data[0] : data;
        setProducts(flatData);
        const foundProduct = flatData.find(
          (p) => String(p.id) === String(id)
        );
        setProduct(foundProduct);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    addToCart({ ...product, qty: quantity });
    setToast({ show: true, name: product.name }); // ✅ show toast
  };

  return (
    <div className="item-container">
      <div className="item-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>

      <div className="item-image-section">
        <img src={product.image} alt={product.name} className="item-image" />
      </div>

      <div className="item-details">
        <div className="title-and-price">
          <h1 className="item-name">{product.name}</h1>
          <p className="item-price" style={{ fontSize: "20px" }}>
            ₹{product.price}
          </p>
        </div>

        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span className="qty-display">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3>Related Products</h3>
            <div className="related-products-grid">
              {relatedProducts.slice(0, 4).map((rp) => (
                <div
                  key={rp.id}
                  className="related-product-card"
                  onClick={() => navigate(`/item/${rp.id}`)}
                >
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="related-product-image"
                  />
                  <p className="related-product-name">{rp.name}</p>
                  <p className="related-product-price">₹{rp.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Fixed Add to Cart */}
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* ✅ Toast */}
      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default Item;
