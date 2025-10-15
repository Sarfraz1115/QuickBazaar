// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Item from "./Pages/Item"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Confirm from "./Pages/Confirm"
import Orders from "./Pages/Orders"
import InstallPrompt from "./components/InstallPrompt"
import UpdateToast from "./components/UpdateToast"

// 💡 Category Page: Dynamic page jo Atta, Dal, Oil sab handle karega
import CategoryPage from "./Pages/CategoryPages/CategoryPage" 

// 💡 Naya Shop Page: Jo Associated.jsx se click hone par load hoga

import ShopPage from "./Pages/ShopPage"

// 💡 Agar aapne 'CartContext' use kiya hai, toh use yahan wrap karna padega
// import { CartProvider } from "./components/CartContext"; 

function App() {

  return (
    // <CartProvider> 
    <BrowserRouter>
    <InstallPrompt/>
    <UpdateToast/>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/orders" element={<Orders />} />
        
        {/* Dynamic Category Route: Atta, Dal, Oil ke liye */}
        <Route path="/category/:categoryKey" element={<CategoryPage/>}/>
        
        {/* Dynamic Shop Route: Associated Shops ke liye (Aapki requirement ke mutabik) */}
        <Route path="/shop/:shopName" element={<ShopPage />} />
      </Routes>
    </BrowserRouter>
    // </CartProvider>
  )
}

export default App