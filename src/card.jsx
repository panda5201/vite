import React from "react";

function Card(props) {
  const cardStyle = {
    border: "none",
    padding: "20px",
    backgroundColor: "#FFF",
    width: "400px",
    height: "200px",
    borderRadius: "20px",
    margin: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props.iconicPlace})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
    event.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  };

  const handleClick = () => {
    window.location.href = props.link;
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <h2
        style={{
          fontSize: "2em",
          zIndex: 1,
          color: "#FFF",
          textAlign: "center",
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {props.province}
      </h2>
    </div>
  );
}

export default Card;