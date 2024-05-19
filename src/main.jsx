import React from 'react'
import ReactDOM from 'react-dom/client'
import Frontpage from './Page1.jsx'
import Provincemenu from './Page2.jsx'
import FoodMenu from './Food_menu_Aceh.jsx'
import FoodMenu1 from './Food_menu_JawaBarat.jsx'
import FoodMenu2 from './Food_menu_Bali.jsx'
import FoodMenu3 from './Food_menu_SulawesiSelatan.jsx'
import FoodMenu4 from './Food_menu_SumateraSelatan.jsx'
import FoodMenu5 from './Food_menu_Maluku.jsx'
import FoodMenu6 from './Food_menu_Yogyakarta.jsx'
import Quiz from "./Quiz_Makanan";
import Aboutus from "./aboutus.jsx";
import './App.css'
import Header from './header.jsx'
import Footer from './footer.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Frontpage />} />  
    <Route path="/Page2" element={<Provincemenu />} />  
    <Route path="/Food_menu_Aceh" element={<FoodMenu />} />
    <Route path="/Food_menu_JawaBarat" element={<FoodMenu1 />} />
    <Route path="/Food_menu_KalimantanBarat" element={<FoodMenu2 />} />
    <Route path="/Food_menu_SulawesiSelatan" element={<FoodMenu3 />} />
    <Route path="/Food_menu_NTT" element={<FoodMenu4 />} />
    <Route path="/Food_menu_Maluku" element={<FoodMenu5 />} />
    <Route path="/Food_menu_PapuaBarat" element={<FoodMenu6 />} />
    <Route path="/Quiz_Makanan" element={<Quiz />} />
    <Route path="/aboutus" element={<Aboutus />} />
  </Routes>
  <Footer />
  </BrowserRouter>
  </React.StrictMode>,
);
