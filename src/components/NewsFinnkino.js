import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';


const theaterOptions = [
  { id: "1014", name: "Pääkaupunkiseutu" },
  { id: "1012", name: "Espoo" },
  { id: "1039", name: "Espoo: Omena" },
  { id: "1038", name: "Espoo: Sello" },
  { id: "1002", name: "Helsinki" },
  { id: "1045", name: "Helsinki: Iitis" },
  { id: "1031", name: "Helsinki: Kinopalatsi" },
  { id: "1032", name: "Helsinki: Maxim" },
  { id: "1033", name: "Helsinki: Tennispalatsi" },
  { id: "1013", name: "Vantaa: Flamingo" },
  { id: "1015", name: "Jyväskylä: Fantasia" },
  { id: "1016", name: "Kuopio: Scala" },
  { id: "1017", name: "Lahti: Kuvapalatsi" },
  { id: "1041", name: "Lappeenranta: Strand" },
  { id: "1018", name: "Oulu: Plaza" },
  { id: "1019", name: "Pori: Promenadi" },
  { id: "1021", name: "Tampere" },
  { id: "1034", name: "Tampere: Cine Atlas" },
  { id: "1035", name: "Tampere: Plevna" },
  { id: "1047", name: "Turku ja Raisio" },
  { id: "1022", name: "Turku: Kinopalatsi" },
  { id: "1046", name: "Raisio: Luxe Mylly" },
];


export default function NewsDetails() {
    const [news, setNews] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(theaterOptions[0].id);
  
    // Tekee api kyselyn uutisdataa varten, ja jäsentää xml datan JavaScript-objektiksi.
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const url = `https://www.finnkino.fi/xml/News/?area=${selectedTheater}`;
          const result = await axios.get(url);
          const parsedData = await xml2js.parseStringPromise(result.data, {explicitArray: false});
          setNews(parsedData.News.NewsArticle);
        } catch (error) {
          console.error("Failed to fetch news:", error);
        }
      };
  
      // Kutsuu getSchedule-funktion uutisten hakemista varten kun komponenttin valittu teatteri muuttuu
      fetchNews();
    }, [selectedTheater]);
  
    
    const handleTheaterChange = (e) => {
      setSelectedTheater(e.target.value); 
    };
  
    return (
      <div>
        <select value={selectedTheater} onChange={handleTheaterChange} className="form-control mb-3">
          {theaterOptions.map((theater) => (
            <option key={theater.id} value={theater.id}>{theater.name}</option>
          ))}
        </select>
        <div className='list-group'>
          {news.map((article, index) => (
            <div key={index} className='list-group-item'>
              <h5>{article.Title}</h5>
              <p><small>{new Date(article.PublishDate).toLocaleDateString()}</small></p>
              <p>{article.HTMLLead}</p>
              <a href={article.ArticleURL} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      </div>
    );
  }