import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import Header from "../components/Header";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
      <>
          <Header/>
          <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/product/:id" element={<ProductPage />}/>
              <Route path="/cart" element={<CartPage/>}/>
          </Routes>
      </>
  )
}

export default App
