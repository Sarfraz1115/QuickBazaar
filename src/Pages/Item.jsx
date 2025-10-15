import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { FaArrowLeft } from "react-icons/fa";
// ✅ Is file ko import karna zaroori hai
import "../CSS/itemPage.css"; 
import AddToCartToast from "../components/AddToCartToast"; 

const Item = () => {
  const { id } = useParams(); // Yeh id ab 'K:1', 'F:10', jaisi hogi
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]); // All products for related section
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); 
  const [toast, setToast] = useState({ show: false, name: "" });

  // 💡 FIX 1: Unique ID se original ID aur source nikalna
  const [sourceId, originalId] = id.split(":"); // 'K:1' -> ['K', '1']

  // Data Fetching Logic (Jo humne pichle step mein fix kiya tha)
  useEffect(() => {
    setLoading(true);
    setProduct(null); // Naye product ke liye state reset karein

    // Fetch Kiranaproducts.json
    const fetchKirana = fetch("/data/Kiranaproducts.json")
      .then((res) => res.json())
      .then(data => Object.values(data).flat().map(p => ({...p, id: `K:${p.id}`})));
    
    // Fetch Fastfood.json
    const fetchFastfood = fetch("/data/Fastfood.json")
      .then((res) => res.json())
      .then(data => Object.values(data).flat().map(p => ({...p, id: `F:${p.id}`})));


    Promise.all([fetchKirana, fetchFastfood])
      .then(([kiranaData, fastfoodData]) => {
        
        // 💡 FIX 2: Sabhi products ko flat karke ek array mein joda jaye
        const allProducts = [...kiranaData, ...fastfoodData];
        setProducts(allProducts);

        // 💡 FIX 3: Product ko uski unique ID se dhundhna
        const foundProduct = allProducts.find((p) => String(p.id) === id);
        
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, [id]); // id change hone par dobara fetch hoga

  
  // Related Products Logic
  let relatedProducts = [];
  if (product && products.length > 0) {
    relatedProducts = products.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
  }

  // Add to Cart Handler
  const handleAddToCart = () => {
    // Add multiple quantities to cart
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    setToast({ show: true, name: product.name });
    setQuantity(1); // Reset quantity after adding to cart
  };

  if (loading) {
    return (
      <div className="item-page-container" style={{paddingTop: '20px', textAlign: 'center'}}>
        <button className="back-button" onClick={() => navigate(-1)} style={{position: 'absolute', top: '15px', left: '15px'}}><FaArrowLeft /></button>
        <div>Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    // 💡 Product Not Found Message
    return (
      <div className="item-page-container" style={{paddingTop: '20px', textAlign: 'center'}}>
        <button className="back-button" onClick={() => navigate(-1)} style={{position: 'absolute', top: '15px', left: '15px'}}><FaArrowLeft /></button>
        <div>
            <h2>Product Not Found</h2>
            <p>Could not find product with ID: {id}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="item-page-container">
      
      {/* Header and Back Button */}
      <div className="item-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="item-shop-name">{product.shop}</span>
      </div>

      {/* Product Image */}
      <div className="item-image-container">
        <img src={product.image} alt={product.name} className="item-image" />
      </div>

      {/* Product Details */}
      <div className="item-details-section">
        <h1 className="item-name">{product.name}</h1>
        <p className="item-price">₹{product.price}</p>
        <p className="item-category">Category: {product.category}</p>
        
        <p className="item-description">
            {/* Yahan aap product description add kar sakte hain agar data mein ho */}
            A high-quality {product.name.toLowerCase()} from {product.shop}, ensuring great taste and quality. Freshly packed for your convenience.
        </p>

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button
            className="qty-btn"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span className="qty-display">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => setQuantity(prev => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3 className="related-products-title">Related Products</h3>
            <div className="related-products-grid">
              {relatedProducts.slice(0, 4).map((rp) => (
                <div
                  key={rp.id}
                  className="related-product-card"
                  onClick={() => {
                    navigate(`/item/${rp.id}`);
                    window.scrollTo(0, 0); 
                  }}
                >
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="related-product-image"
                  />
                  <p className="related-product-name">{rp.name}</p>
                  <p className="related-product-price">₹{rp.price}</p>
                </div>
              ))}    </div>
          </div>
        )}
      </div>

      {/* Fixed Add to Cart Button */}
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add {quantity} Item{quantity > 1 ? 's' : ''} to Cart
      </button>

      {/* Toast */}
      <AddToCartToast
        show={toast.show}
        itemName={toast.name}
        onClose={() => setToast({ show: false, name: "" })}
      />
    </div>
  );
};

export default Item;