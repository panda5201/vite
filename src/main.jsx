import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './Page1';
import Provincemenu from './Page2';
import FoodMenu from './Food_menu_Aceh';
import FoodMenu1 from './Food_menu_JawaBarat';
import FoodMenu2 from './Food_menu_Bali';
import FoodMenu3 from './Food_menu_SulawesiSelatan';
import FoodMenu4 from './Food_menu_SumateraSelatan';
import FoodMenu5 from './Food_menu_Maluku';
import FoodMenu6 from './Food_menu_Yogyakarta';
import Quiz from "./Quiz_Makanan";
import Aboutus from "./aboutus";
import Header from './header';
import Footer from './footer';
import './App.css';

const repoName = '/vite/'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={repoName}>
      <Header />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/Page2" element={<Provincemenu />} />
        <Route path="/Food_menu_Aceh" element={<FoodMenu />} />
        <Route path="/Food_menu_JawaBarat" element={<FoodMenu1 />} />
        <Route path="/Food_menu_Bali" element={<FoodMenu2 />} />
        <Route path="/Food_menu_SulawesiSelatan" element={<FoodMenu3 />} />
        <Route path="/Food_menu_SumateraSelatan" element={<FoodMenu4 />} />
        <Route path="/Food_menu_Maluku" element={<FoodMenu5 />} />
        <Route path="/Food_menu_Yogyakarta" element={<FoodMenu6 />} />
        <Route path="/Quiz_Makanan" element={<Quiz />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
);
