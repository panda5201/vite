import React from "react";
import "./App.css";
import Card from "./card";
import ListProvince from "./List_Province";
import { Link } from "react-router-dom";
import HoverEffect from "./responsive_button";

function Provincemenu() {
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url('')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        className="heading"
        style={{
          textAlign: "center",
          color: "#FFF",
          fontSize: "1.5em",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          marginBottom: "40px",
          marginTop: "40px",
        }}
      >
        Menjelajah Makanan Nusantara
      </h1>

      <div className="list">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {ListProvince.map((province) => (
            <Card
              key={province.id}
              province={province.province}
              iconicPlace={province.iconicPlace}
              link={province.link}
            />
          ))}
        </div>
      </div>
      <HoverEffect>
        <Link className="big-button-link" to="/Quiz_Makanan" >
          <h2>Ayo Menguji Pengetahuan!</h2>
        </Link>
      </HoverEffect>
    </div>
  );
}

export default Provincemenu;