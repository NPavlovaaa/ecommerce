import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import MainPage from "./pages/MainPage";
import Header from "../components/Header";
import ProductPage from "./pages/ProductPage";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/product/:id" element={<ProductPage />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
