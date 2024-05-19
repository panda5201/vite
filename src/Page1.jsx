import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";

const getPermission = () => {
  Notification.requestPermission().then(result => {
    if (result === 'granted') {
      new Notification('Halo travelers', {
        body: 'Selamat Menjelajah!.'
      });
    }
  });
};

const Frontpage = () => {
  const handleClick = () => {
    getPermission();
  };

  return (
    <div className="app-container">
      <Gallery />
      <Link to="/Page2" className="header-button" onClick={handleClick}>Mulai Jelajah</Link>
    </div>
  );
};

const Gallery = () => {
  const images = [
    "https://masandy.com/wp-content/uploads/2020/09/15-makanan-khas-indonesia.jpg",
    "https://th.bing.com/th/id/OIP.w_aSdx53QBnbd2ZDA8XspwHaEj?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.JPpeYuCL435goD2YPyf27gHaE8?w=768&h=512&rs=1&pid=ImgDetMain",
    "https://presidentcateringpernikahan.com/wp-content/uploads/2022/02/President-Catering-280-2048x1365.jpg",
    "https://th.bing.com/th/id/OIP.luqrE0eiZhPUpl4H-GED4wHaE7?rs=1&pid=ImgDetMain",
    "https://asocialnomad.com/wp-content/uploads/2024/01/Balinese-Food.jpg",
    "https://2.bp.blogspot.com/-f9Htv6xmUow/WYVhPBrd44I/AAAAAAAAFQM/5LQZvIugafIw9Sp49pZfa_2PTAYWZSLXgCEwYBhgL/s640/image6.jpeg"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, images.length]);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Galeri Kuliner</h2>
      <div className="gallery-items">
        <GalleryItem imageUrl={images[currentIndex]} />
      </div>
    </div>
  );
};

const GalleryItem = ({ imageUrl, isActive }) => {
  return (
    <div className={`gallery-item ${isActive ? '' : 'fade-out'}`}>
      <img src={imageUrl} alt="Gallery Item" className="gallery-item-image" />
    </div>
  );
};

export default Frontpage;
