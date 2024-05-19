import React, { useState, useEffect } from "react";
import axios from "axios";
import Member from './Member';
import "./aboutus.css";

const AboutUs = () => {
  const [randomQuotes, setRandomQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/unique-quotes");
      const htmlContent = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
  
      const tableRows = doc.querySelectorAll("table tbody tr");
      const quotesArray = Array.from(tableRows).map(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length > 1) {
          return {
            quote: cells[0].textContent.trim(),
            who: cells[1].textContent.trim(),
          };
        }
        return null;
      }).filter(item => item !== null);
  
      const filteredQuotes = quotesArray.filter(quote => quote.quote.length <= 50); 
  
      const shuffledQuotes = filteredQuotes.sort(() => Math.random() - 0.5);
  
      setRandomQuotes(shuffledQuotes.slice(0, 4));
    } catch (error) {
      console.error("Error fetching and parsing quotes:", error);
    }
  };
  

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
      <div className="container">
        <h2>About Us</h2>
        <div className="members-container">
          {randomQuotes.length >= 4 ? (
            <>
              <Member
                name="Eliza Lawis"
                role={randomQuotes[0].quote}
                imageUrl="/sounds/eli.jpg"
                imageAlt="Eliza Lawis"
                className="member-image rounded-full"
              />
              <Member
                name="Hanzel Oliver Wihandono"
                role={randomQuotes[1].quote}
                imageUrl="/sounds/hanzel.jpg"
                imageAlt="Hanzel Oliver Wihandono"
                className="member-image rounded-full"
              />
              <Member
                name="Vinson Gautama"
                role={randomQuotes[2].quote}
                imageUrl="/sounds/vinson.jpg"
                imageAlt="Vinson Gautama"
                className="member-image rounded-full"
              />
              <Member
                name="Wilsen Susanto"
                role={randomQuotes[3].quote}
                imageUrl="/sounds/ws.jpg"
                imageAlt="Wilsen Susanto"
                className="member-image rounded-full"
              />
            </>
          ) : (
            <p>Loading quotes...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
