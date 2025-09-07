import React, { useState } from 'react'
import '../CSS/home.css';
import { FaSearch, FaShoppingBag, FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import products from '../data/Kiranaproducts';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [search, setSearch] = useState('');
    const { cart, addToCart } = useCart();
    const navigate = useNavigate();

    // Filter products by search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className="app-container">
            <header className="header">
                <h1 className="logo">QuickBazaar</h1>
                <div className="cart-icon-container" onClick={() => navigate('/cart')}>
                    <FaShoppingBag className="cart-icon" />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </div>
            </header>

            {/* Sticky Search Bar */}
            <div className="sticky-search-container">
                <div className="search-bar-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for groceries..."
                        className="search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>


            <section className="categories-section">
                <h2 className="section-title">Categories</h2>
                <div className="categories-grid">
                    <div className="category-item">
                        <div className="category-icon-container"><img src="/Images/ashirvad.webp" className='category-icon' alt="" /></div>
                        <p>Atta, Dal & Rice</p>
                    </div>
                    <div className="category-item">
                        <div className="category-icon-container"><img src="/Images/moongdal.webp" className='category-icon' alt="" /></div>
                        <p>Masala & Oil</p>
                    </div>
                    <div className="category-item">
                        <div className="category-icon-container"><img src="/Images/breadchakote.jpg" className='category-icon' alt="" /></div>
                        <p>Dairy, Bread & Eggs</p>
                    </div>
                    <div className="category-item">
                        <div className="category-icon-container"><img src="/Images/ashirvad.webp" className='category-icon' alt="" /></div>
                        <p>Snacks & Munchies</p>
                    </div>
                    <div className="category-item">
                        <div className="category-icon-container"><img src="/Images/ashirvad.webp" className='category-icon' alt="" /></div>
                        <p>Meat</p>
                    </div>
                    <div className="category-item">
                        <div className="category-icon-container"><img src="/Images/ashirvad.webp" className='category-icon' alt="" /></div>
                        <p>Meat</p>
                    </div>
                    <div className="category-item">
                        <div className="category-icon-container">{/* Meat icon */}</div>
                        <p>Meat</p>
                    </div>
                    {/* Add more categories here */}
                </div>
            </section>

            {/* <section className="popular-products-section">
                <h2 className="section-title">Popular Products</h2>
                <div className="products-grid">
                    {filteredProducts.length === 0 && (
                        <p className="no-products">No products found.</p>
                    )}
                    {filteredProducts.map(product => (
                        <div className="product-card" key={product.id}>
                            <div className="product-image-container">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">₹{product.price}</p>
                            <button className="add-button" onClick={() => addToCart(product)}>
                                <FaShoppingCart /> Add
                            </button>
                        </div>
                    ))}
                </div>
            </section> */}
            <section className="popular-products-section">
                <h2 className="section-title">Popular Products</h2>
                <div className="products-grid">
                    {filteredProducts.length === 0 && (
                        <p className="no-products">No products found.</p>
                    )}
                    {filteredProducts.map(product => (
                        <div
                            className="product-card"
                            key={product.id}
                            onClick={() => navigate(`/item/${product.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="product-image-container">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">₹{product.price}</p>
                            <button
                                className="add-button"
                                onClick={e => {
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

            <nav className="bottom-nav-bar">
                <div className="nav-item active">
                    <FaHome />
                    <p>Home</p>
                </div>
                <div className="nav-item" onClick={() => navigate('/cart')}>
                    <FaShoppingCart />
                    <p>Cart</p>
                    {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
                </div>
                <div className="nav-item" onClick={() => navigate('/orders')}>
                    <FaUser />
                    <p>Orders</p>
                </div>
            </nav>
        </div>
    )
}

export default Home