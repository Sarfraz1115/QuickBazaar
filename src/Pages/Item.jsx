import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Kiranaproducts';
import { useCart } from '../components/CartContext';
import { FaArrowLeft, FaShareAlt, FaPlus, FaMinus } from 'react-icons/fa';
import '../CSS/itemPage.css';

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [customQty, setCustomQty] = useState('');
  const [unit, setUnit] = useState('gm');
  const [customNote, setCustomNote] = useState('');

  if (!product) {
    return <div className="not-found">Product not found.</div>;
  }




  // const handleAddToCart = () => {
  //   const qtyValue = customQty ? Number(customQty) : Number(quantity);
  //   const finalQty = customQty ? `${qtyValue} ${unit}` : qtyValue;

  //   if (isNaN(qtyValue) || qtyValue <= 0) return;

  //   let calculatedPrice = product.price;

  //   if (customQty) {
  //     const basePricePerGram = product.price / 1000;
  //     if (unit === 'gm') {
  //       calculatedPrice = basePricePerGram * qtyValue;
  //     } else if (unit === 'kg') {
  //       calculatedPrice = product.price * qtyValue;
  //     }
  //   }

  //   addToCart({ ...product, qty: finalQty, customPrice: calculatedPrice, note: customNote });
  //   navigate('/cart');
  // };

  const handleAddToCart = () => {
    const qtyValue = customQty ? Number(customQty) : Number(quantity);
    const finalQty = customQty ? `${qtyValue} ${unit}` : `${qtyValue}`;

    if (isNaN(qtyValue) || qtyValue <= 0) return;

    let calculatedPrice = product.price;

    if (customQty) {
      const basePricePerGram = product.price / 1000;
      if (unit === 'gm') {
        calculatedPrice = basePricePerGram * qtyValue;
      } else if (unit === 'kg') {
        calculatedPrice = product.price * qtyValue;
      } else if (unit === 'pcs') {
        calculatedPrice = product.price * qtyValue; // assume per piece price
      }
    }

    addToCart({
      ...product,
      displayQty: finalQty,   // 👈 string for showing
      calcQty: qtyValue,      // 👈 pure number for calculation
      customPrice: calculatedPrice,
      note: customNote
    });

    navigate('/cart');
  };





  const incrementQuantity = () => {
    setQuantity(prevQty => prevQty + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
  };

  return (
    <div className="item-container">
      <div className="item-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <button className="share-button">
          <FaShareAlt />
        </button>
      </div>

      <div className="item-image-section">
        <img src={product.image} alt={product.name} className="item-image" />
      </div>

      <div className="item-details">
        <div className="title-and-price">
          <h2 className="item-name">{product.name}</h2>
          <p className="item-price">₹{product.price}</p>
        </div>
        {/* <p className="item-description">
          Creamy, nutrient-rich avocados, perfect for salads, toast, or guacamole. Grown
          without synthetic pesticides or fertilizers.
        </p> */}

        <div className="quantity-controls">
          <button onClick={decrementQuantity} className="qty-btn"><FaMinus /></button>
          <span className="qty-display">{quantity}</span>
          <button onClick={incrementQuantity} className="qty-btn"><FaPlus /></button>
        </div>

        <div className="custom-quantity-section">
          <label className="input-label">Or enter custom quantity:</label>
          <div className="custom-input-group">
            <input
              type="number"
              min="1"
              placeholder="e.g., 250"
              value={customQty}
              onChange={e => setCustomQty(e.target.value)}
              className="custom-qty-input"
            />
            <select
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className="unit-select"
            >
              <option value="gm">gm</option>
              <option value="kg">kg</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
        </div>

        <div className="note-section">
          <label className="input-label">Add a note (optional):</label>
          <textarea
            placeholder="e.g., Please pack in small packets"
            value={customNote}
            onChange={e => setCustomNote(e.target.value)}
            className="custom-note-textarea"
          />
        </div>

        {/* Related Products Section */}
        <div className="related-products-section">
          <h3>Related Products</h3>
          <div className="related-products-grid">
            <div className="related-product-card">
              <img src="https://via.placeholder.com/200x200" alt="Organic Tomatoes" className="related-product-image" />
              <p className="related-product-name">Organic Tomatoes</p>
              <p className="related-product-price">$3.49</p>
            </div>
            <div className="related-product-card">
              <img src="https://via.placeholder.com/200x200" alt="Organic Cucumbers" className="related-product-image" />
              <p className="related-product-name">Organic Cucumbers</p>
              <p className="related-product-price">$1.99</p>
            </div>
          </div>
        </div>
      </div>

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Item;