import { Routes, Route } from 'react-router-dom';
import './App.scss'
import MainPage from "./pages/MainPage";
import Header from "../components/Header";
import ProductPage from "./pages/ProductPage";
import {useQueryParamsStoreInit} from "../store/RootStore/QueryParamsStore/QueryParamsStoreInit";


function App() {
    useQueryParamsStoreInit();
  return (
      <>
          <Header/>
          <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/product/:id" element={<ProductPage />}/>
          </Routes>
      </>
  )
}

export default App
