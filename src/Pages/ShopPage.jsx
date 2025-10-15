import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../components/CartContext"; 
import AddToCartToast from "../components/AddToCartToast"; 
// ✅ Nayi CSS file import karein
import "../CSS/Categorycss/shoppage.css"; 

const PRODUCTS_PER_LOAD = 10; 

const ShopPage = () => {
    const { shopName: urlShopName } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [allProducts, setAllProducts] = useState([]); 
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD); 
    const [loading, setLoading] = useState(true);
    const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, name: "" });

    const cleanShopName = urlShopName ? urlShopName.replace(/_/g, ' ') : '';

    // Data Fetching and Filtering Logic
    useEffect(() => {
        setLoading(true);

        const fetchKirana = fetch("/data/Kiranaproducts.json").then(res => res.json());
        const fetchFastfood = fetch("/data/Fastfood.json").then(res => res.json());

        Promise.all([fetchKirana, fetchFastfood])
            .then(([kiranaData, fastfoodData]) => {
                let tempProducts = [];
                
                // Data Flattening Logic (pichle fixes ke hisaab se)
                const flattenData = (data) => Array.isArray(data) ? data : (typeof data === 'object' && data !== null ? Object.values(data).flat() : []);
                tempProducts.push(...flattenData(kiranaData));
                tempProducts.push(...flattenData(fastfoodData));

                // Filtering: Shop name matching
                const shopProducts = tempProducts.filter(
                    p => p.shop && p.shop.toLowerCase() === cleanShopName.toLowerCase()
                );
                
                setAllProducts(shopProducts); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching shop data:", err);
                setLoading(false);
                setAllProducts([]);
            });
            
        setVisibleCount(PRODUCTS_PER_LOAD); 
    }, [cleanShopName]);

    // Infinite Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            const isBottom = 
                window.innerHeight + document.documentElement.scrollTop >= 
                document.documentElement.offsetHeight - 10;
            
            if (isBottom && !isLoadMoreLoading && visibleCount < allProducts.length) {
                setIsLoadMoreLoading(true);
                // Loading animation dikhane ke liye chota delay
                setTimeout(() => {
                    setVisibleCount(prevCount => prevCount + PRODUCTS_PER_LOAD);
                    setIsLoadMoreLoading(false);
                }, 500); 
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleCount, allProducts.length, isLoadMoreLoading]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setToast({ show: true, name: product.name });
    };

    const visibleProducts = allProducts.slice(0, visibleCount);

    return (
        <div className="shop-page-container">
            <div className="shop-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className="shop-title">Shop: {cleanShopName}</h1>
            </div>

            {loading ? (
                <p className="loading-message">Loading shop details...</p>
            ) : allProducts.length === 0 ? (
                <p className="not-found-message">No products found for {cleanShopName}.</p>
            ) : (
                // Products Grid
                <div className="shop-products-grid">
                    {visibleProducts.map((product) => (
                        <div 
                            key={`${product.id}-${product.shop}`} 
                            className="shop-product-card"
                        >
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-price">₹{product.price}</p>
                            <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                                <FaShoppingCart /> Add
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Loading Indicator */}
            {isLoadMoreLoading && (
                <p className="load-more-message">
                    Loading more products...
                </p>
            )}

            {/* End of results message */}
            {!loading && !isLoadMoreLoading && visibleCount >= allProducts.length && allProducts.length > 0 && (
                <p className="end-of-results">
                    You have reached the end of the products.
                </p>
            )}

            <AddToCartToast
                show={toast.show}
                itemName={toast.name}
                onClose={() => setToast({ show: false, name: "" })}
            />
        </div>
    );
};

export default ShopPage;