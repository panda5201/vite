import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";
import HoverEffect from "./responsive_button";

const foodImg = [
  {
    img: "https://rinaresep.com/wp-content/uploads/2022/07/Mie-aceh.jpg",
  },
  {
    img : "https://1.bp.blogspot.com/-YlxqWATXiUs/Xq_EJMhS18I/AAAAAAAAAPg/p-OTu8BwhyInWJk4YHm8wXdkQYg0j9rUACLcBGAsYHQ/s1600/Capture.JPG",
  },
  {
    img : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfd3ul4DyT-7_mqI7D9YEvi3vpGl3FLUrLGvXDECMuCqzw2MCy2dOAuSOKRJQDKfJ7XM4-Gj2zRXYxQgZvhNLmiUNnmmHil8Rka5-RX2QEvVgrk_UZUWu2cxavNBLvIgiYyNS5_PCOoqOYZPUpJ2Fty7fBTVkU9gTgZLAKaLXgWLBrsfojw6XBL-RbniS5/s1800/sie%20itek.jpg",
  },
  {
    img : "https://correcto.id/content/images/th1_2020061404542749071.jpg",
  },
  {
    img : "https://wanitaindonesia.co/wp-content/uploads/2021/10/berita-7-18.jpeg",
  },
];

const MainMenu = ({ setView }) => (
  <div className="menu">
    <h1>Makanan Tradisional Aceh</h1>
    <HoverEffect>
      <button className="big-button-link" onClick={() => setView("foods")}>Open Food Menu</button>
    </HoverEffect>
  </div>
);

const FoodMenu = ({ setView, currentPage, setCurrentPage }) => {
  const [hoveredFood, setHoveredFood] = useState(null);
  const [randomFact, setRandomFact] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoodData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/food-data-aceh");
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);
  
  const fetchFact = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(
        "http://localhost:3000/api/unique-facts-aceh"
      );
      console.log("Response data:", response.data);
      const htmlContent = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      console.log("Parsed document:", doc);

      const factListItems = doc.querySelectorAll("ol li");
      console.log("Selected elements:", factListItems);

      const factsArray = Array.from(factListItems);

      const randomIndex = Math.floor(Math.random() * factsArray.length);
      const randomFact = factsArray[randomIndex].textContent.trim();
      
      setRandomFact(randomFact);
    } catch (error) {
      console.error("Error fetching and parsing facts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
  }, [currentPage]);
  
  const foodsPerPage = 1;
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = foodData.slice(indexOfFirstFood, indexOfLastFood);
  const currentFoodImage = foodImg.slice(indexOfFirstFood, indexOfLastFood);

  const nextPage = () => {
    if (currentPage < Math.ceil(foodData.length / foodsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="menu">
      <HoverEffect>
        <Link className="big-button-link" to="/Page2">
          <h3>Return</h3>
        </Link>
      </HoverEffect>
      <div className="menu-horizontal">
        {currentFoods.map((food, index) => (
          <div
            key={index}
            className="food-container"
          >
            <div className="food-image-container">
              {currentFoodImage.map((foodImg, index) => (
                <img className="food-image" src={foodImg.img} />
              ))}
            </div>
            <div className="food-content"> 
              <h3 className="food-name">{food.name}</h3>
              <p className="food-description">{food.description}</p>
              <div className="nav-button">
                <HoverEffect>
                  <button onClick={prevPage}>Prev</button>
                </HoverEffect>
                <HoverEffect>
                  <button onClick={nextPage}>Next</button>
                </HoverEffect>
              </div>
            </div>    
          </div>
        ))}
      </div>
      <div className="random-fact">
        <h2>Fakta Menarik dari Aceh</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{randomFact}</p>
        )}
      </div>
    </div>
  );
};


const App = () => {
  const [view, setView] = useState("main");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="App">
      <div className="background" />
      {view === "main" && <MainMenu setView={setView} />}
      {view === "foods" && (
        <FoodMenu
          setView={setView}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default App;