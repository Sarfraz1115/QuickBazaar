

export const TOP_CATEGORIES = {
    // Top-Level Category 1: Atta, Dal, Rice Group
    'atta_dal_rice': {
        name: 'Atta, Rice & Dals', // Home Page par dikhega
        dataFile: '/data/Kiranaproducts.json',
        defaultSubKey: 'Atta',
        subCategories: [
            // Jo sub-categories is TOP-LEVEL category se related honi chahiye
            { key: "Atta", name: "Atta & Flours", image: "/Images/ashirvad.webp" },
            { key: "Rice", name: "Rice & Grains", image: "/Images/chandtara.jpg" },
            { key: "Dal", name: "Dals & Pulses", image: "/Images/masoordal.webp" },
            { key: "Salt", name: "Salt & Sugar", image: "/Images/tatasalt.jpg" },
        ]
    },
    // Top-Level Category 2: Oils, Masala Group
    'oils_masala': {
        name: 'Oils, Spices & Masala', // Home Page par dikhega
        dataFile: '/data/Kiranaproducts.json',
        defaultSubKey: 'Oil',
        subCategories: [
            // Jo sub-categories is TOP-LEVEL category se related honi chahiye
            { key: "Oil", name: "Oils & Ghee", image: "/Images/fortuneoil.jpg" },
            { key: "Masala", name: "Spices & Masala", image: "/Images/turmeric.webp" },
            { key: "Soya", name: "Soya Products", image: "/Images/soya.jpg" },
            { key: "Beverages", name: "Tea & Coffee", image: "/Images/tea.webp" },
        ]
    },
    // Top-Level Category 3: Fast Food
    'fastfood': {
        name: 'Fast Food Delights',
        dataFile: '/data/Fastfood.json',
        defaultSubKey: 'Burger',
        subCategories: [
            { key: "Burger", name: "Burgers", image: "/Images/alooburger.jpg" },
            { key: "Pizza", name: "Pizzas", image: "/Images/vegpizza.jpg" },
            { key: "PaniPuri", name: "Pani Puri & Chaat", image: "/Images/panipuri.jpg" },
            { key: "Milkshake", name: "Milkshakes", image: "/Images/chocolatemilkshake.jpg" },
            { key: "Fries", name: "Fries & Sides", image: "/Images/frenchfries.jpg" },
        ]
    },
    'Detergents': {
        name: 'Household Cleaning',
        dataFile: '/data/Kiranaproducts.json',
        defaultSubKey: 'Detergent',
        subCategories: [
            { key: "Detergent", name: "Detergents", image: "/Images/surfexcel.webp" },
            { key: "Soap", name: "Soaps", image: "/Images/lifebuoy.webp" },

        ]
    },
    'Sweets': {
        name: 'Sweet Treats',
        dataFile: '/data/Kiranaproducts.json',
        defaultSubKey: 'Sweets',
        subCategories: [
            { key: "Sweets", name: "Sweets", image: "/Images/rasgulla.jpg" },
            { key: "Snacks", name: "Snacks", image: "/Images/namkeen.jpg" },
        ]
    },

    'dairy': {
        name: 'Dairy, Bread & Eggs',
        dataFile: '/data/Kiranaproducts.json',
        // FIX: defaultSubKey 'Bread' set kiya taaki dairy category par click karne par Bread products dikhein
        defaultSubKey: 'Bread',
        subCategories: [
            // FIX: Keys ko correct kiya (e.g., 'Milk' or 'Eggs' jaisi keys use ki)
            // Note: 'Bread' key already Kiranaproducts.json mein hai.
            { key: "Bread", name: "Bread & Buns", image: "/Images/bread.webp" },
            { key: "Milk", name: "Milk & Curd", image: "/Images/amulmilk.jpg" }, // 'Milk' key Kiranaproducts.json mein nahi hai, lekin abhi 'Bread' se products dikhenge
            { key: "Eggs", name: "Eggs", image: "/Images/eggs.webp" }, // 'Eggs' key Kiranaproducts.json mein nahi hai
            { key: "Cheese", name: "Butter & Cheese", image: "/Images/butter.webp" }, // 'Cheese' key Kiranaproducts.json mein 'cheese' se match hogi
        ]
    }
    // Aap yahan "Detergent", "Soap" jaisi alag groups bhi bana sakte hain.
};


export const getTopCategoryBySubKey = (subKey) => {
    for (const [topKey, data] of Object.entries(TOP_CATEGORIES)) {
        if (data.subCategories.some(cat => cat.key === subKey)) {
            return topKey;
        }
    }
    return null;
};

export const getSubCategoriesBySubKey = (subKey) => {
    const topKey = getTopCategoryBySubKey(subKey);
    return topKey ? TOP_CATEGORIES[topKey].subCategories : [];
};