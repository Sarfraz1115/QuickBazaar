import { useNavigate } from "react-router-dom";
import AttaDal from "/attadal.png";
import Masala from "/masala.png";
import Cleaning from "/cleaning.png";
import Munchies from "/munchies.png";
import Dairy from "/Dairy.png";
import "../CSS/categories.css";

const CategoriesWithImages = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Atta, Rice, Oil & Dals', image: AttaDal, key: 'Atta' },
    { name: 'Masala & Dry Fruits', image: Masala, key: 'Masala' },
    { name: 'Cleaning Essentials', image: Cleaning, key: 'Cleaning' },
    { name: 'Munchies', image: Munchies, key: 'Munchies' },
    { name: 'Dairy, Bread & Eggs', image: Dairy, key: 'Dairy' },
  ];

  const handleCategoryClick = (categoryKey) => {
    // Navigate to category page with query param
    navigate(`/category/${categoryKey}`);
  };

  return (
    <div className="categories-container">
      <div className="category-header">
        <h3> Shop By Category</h3>
      </div>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => handleCategoryClick(category.key)}
          >
            <div className="category-image-container">
              <img src={category.image} alt={category.name} className="category-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CategoriesWithImages;