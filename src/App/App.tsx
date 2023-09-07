import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import MainPage from "./pages/MainPage";
import Header from "../components/Header";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<MainPage />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
