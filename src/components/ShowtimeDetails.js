
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import { Link } from 'react-router-dom'; 


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



export default function ShowtimeDetails() {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(theaterOptions[0].id);


  useEffect(() => {
    const getSchedule = async () => {
      try {
        const today = new Date();
        // Muodostetaan päivämäärästringi tämän päivän mukaisesti, haetaan dataa API:sta ja jäsennetään se.
        const date = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
        const url = `https://www.finnkino.fi/xml/Schedule/?area=${selectedTheater}&dt=${date}`;
        const result = await axios.get(url);
        const jsResult = await xml2js.parseStringPromise(result.data);
        let shows = jsResult.Schedule.Shows[0].Show || [];

        // Suodatetaan menneet näytökset pois
        shows = shows.filter(show => {
          const showStartTime = new Date(show.dttmShowStart[0]);
          return showStartTime > today;
        });

        setShowtimes(shows);
      } catch (error) {
        console.error("Failed to fetch showtimes:", error);
      }
    };

    getSchedule();
  }, [selectedTheater]);

  // Päivitetään Handler funktio valitulla teatterin valinnalla.
  const handleTheaterChange = (e) => {
    setSelectedTheater(e.target.value);
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <select value={selectedTheater} onChange={handleTheaterChange} className="form-control me-2">
          {theaterOptions.map((theater) => (
            <option key={theater.id} value={theater.id}>{theater.name}</option>
          ))}
        </select>
        <Link to={`/showtimes/news`} className="btn btn-light">News</Link>
      </div>
      
      <div className='row'>
        <div className='col-12'>
          <ul className='list-group'>
            {showtimes.map((show, index) => (
              <li className='list-group-item' key={index}>
                <div className='row'>
                  <div className='col-4'>{show.Title[0]}</div>
                  <div className='col-4'>{new Date(show.dttmShowStart[0]).toLocaleString()}</div>
                  <div className='col-4'>{show.Theatre[0]}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


