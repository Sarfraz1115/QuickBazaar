import React, { useState, useEffect, useRef } from "react";
import "../CSS/hero.css";
import { useNavigate } from "react-router-dom";

const heroBanners = [
  {
    image: "/attadal.png",
    title: "Kirana",
    subtitle: "Delivered to your door",
    button: "Shop Now",
  },
  {
    image: "/Images/toordal.jpg",
    title: "FastFoods",
    subtitle: "Save more on essentials",
    button: "See Offers",
  },
  {
    image: "/Images/tatasalt.jpg",
    title: "Dairy and Drinks",
    subtitle: "Everything you need, daily",
    button: "Order Today",
  },
  {
    image: "/Images/tatasalt.jpg",
    title: "Daily Essentials",
    subtitle: "Everything you need, daily",
    button: "Order Today",
  },
];

const Hero = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (heroRef.current) {
        const width = heroRef.current.clientWidth;
        const nextIndex = (heroIndex + 1) % heroBanners.length;
        heroRef.current.scrollTo({
          left: width * nextIndex,
          behavior: "smooth",
        });
        setHeroIndex(nextIndex);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [heroIndex]);

  // 👇 Handle manual scroll (user swipe)
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const width = heroRef.current.clientWidth;
        const scrollLeft = heroRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / width);
        setHeroIndex(newIndex);
      }
    };

    const slider = heroRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="hero-wrapper" onClick={() => navigate('/category/kirana')}>
      <div className="hero-carousel" ref={heroRef}>
        {heroBanners.map((banner, idx) => (
          <div className="hero-card" key={idx}>
            <img src={banner.image} alt={banner.title} className="hero-img" />
            <div className="hero-content">
              <h2>{banner.title}</h2>
              <p>{banner.subtitle}</p>
              <button className="hero-btn">{banner.button}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-dots">
        {heroBanners.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === heroIndex ? "active" : ""}`}
            onClick={() => {
              if (heroRef.current) {
                const width = heroRef.current.clientWidth;
                heroRef.current.scrollTo({
                  left: width * idx,
                  behavior: "smooth",
                });
              }
              setHeroIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
