import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import HoverEffect from "./responsive_button";

const foodImg = [
  {
    img:
      "https://www.mldspot.com/storage/generated/June2021/Ayam%20Betutu.jpg",
  },
  {
    img:
      "https://content.shopback.com/id/wp-content/uploads/2017/09/28103521/sate-lilit-bali.jpg",
  },
  {
    img:
      "https://balipustakanews.com/wp-content/uploads/2022/07/srombotan-2.jpg",
  },
  {
    img:
      "https://3.bp.blogspot.com/-TwLWniSPM4Q/VV2Mgci4eTI/AAAAAAAAAnU/vfjykbfjePw/s1600/lawar%2B2.jpg",
  },
  {
    img:
      "https://i1.wp.com/resepkoki.id/wp-content/uploads/2020/03/Resep-Nasi-Campur-Bali.jpg?fit=1300%2C1274&ssl=1",
  },
];

const MainMenu = ({ setView }) => (
  <div className="menu">
    <h1>Makanan Tradisional Bali</h1>
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
      const response = await axios.get("http://localhost:3000/api/food-data-bali");
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
        "http://localhost:3000/api/unique-facts-Bali"
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
        <h2>Fakta Menarik dari Bali</h2>
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