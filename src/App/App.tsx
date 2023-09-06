import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import MainPage from "./pages/MainPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            {/*<Route path="/:id" element={<User />} />*/}
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
