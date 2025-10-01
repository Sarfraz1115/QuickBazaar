import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../components/CartContext";
import AddToCartToast from "../../components/AddToCartToast";
import "../../CSS/Categorycss/attadal.css";

const Attadal = () => {
  const { categoryKey } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Toast state
  const [toast, setToast] = useState({ show: false, name: "" });

  useEffect(() => {
    fetch("/data/Kiranaproducts.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.category === categoryKey);
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryKey]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ show: true, name: product.name });
  };

  return (
    <div className="category-page">
      <h2>{categoryKey}</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="category-products-grid">
          {products.map((product) => (
            <div key={product.id} className="category-product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}

      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default Attadal;
