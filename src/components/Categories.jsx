// import React from 'react';
// import { FaAppleAlt, FaCarrot, FaBreadSlice, FaCheese, FaFish, FaCocktail, FaHome, FaPlus } from 'react-icons/fa';
// import '../CSS/categories.css';

// const Categories = () => {
//     const categories = [
//         { name: 'Fruits', icon: <FaAppleAlt /> },
//         { name: 'Vegetables', icon: <FaCarrot /> },
//         { name: 'Bakery', icon: <FaBreadSlice /> },
//         { name: 'Dairy', icon: <FaCheese /> },
//         { name: 'Meat & Fish', icon: <FaFish /> },
//         { name: 'Beverages', icon: <FaCocktail /> },
//         { name: 'Household', icon: <FaHome /> },
//         { name: 'More', icon: <FaPlus /> },
//     ];

//     return (
//         <div className="categories-container">
//             <div className="categories-header">
//                 <h2>Shop by Category</h2>
//                 <a href="#" className="see-all">See all</a>
//             </div>
//             <div className="categories-list">
//                 {categories.map((category, index) => (
//                     <div key={index} className="category-item">
//                         <div className="category-icon">{category.icon}</div>
//                         <div className="category-name">{category.name}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Categories;


import React from 'react';
import '../CSS/categories.css';

// Import images
import AttaDal from '/attadal.png';
import Cleaning from '/cleaning.png';
import Dairy from '/Dairy.png';
import Masala from '/masala.png';
import Munchies from '/munchies.png';

const CategoriesWithImages = () => {
    const categories = [
        { name: 'Atta, Rice,\nOil & Dals', image: AttaDal },
        { name: 'Masala &\nDry Fruits', image: Masala },
        { name: 'Cleaning\nEssentials', image: Cleaning },
        { name: 'Munchies', image: Munchies },
        { name: 'Dairy, Bread\n& Eggs', image: Dairy },
    ];

    return (
        <div className="categories-container">
            <div className="category-header">
                <h3> Shop By Category</h3>
                {/* <a href="#" className="see-all">See all</a> */}
            </div>
            <div className="categories-list">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <div className="category-image-container">
                            <img src={category.image} alt={category.name} className="category-image" />
                        </div>
                        {/* <div className="category-name">{category.name}</div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesWithImages;