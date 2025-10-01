import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Item from "./Pages/Item"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Confirm from "./Pages/Confirm"
import Orders from "./Pages/Orders"
import InstallPrompt from "./components/InstallPrompt"
import UpdateToast from "./components/UpdateToast"
import Attadal from "./Pages/CategoryPages/Attadalrice"

function App() {


  return (
    <BrowserRouter>
    <InstallPrompt/>
    <UpdateToast/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryKey" element={<Attadal/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
