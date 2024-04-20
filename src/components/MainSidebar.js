
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import './MainSidebar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function MainSidebar() {
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Hakee Helsigistä näytösaikoja
    const getSchedule = async () => {
      try {
        const areaId = '1014';
        const today = new Date();
        const date = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
        const url = `https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${date}`;
        const result = await axios.get(url);
        const jsResult = await xml2js.parseStringPromise(result.data);

        let futureShows = jsResult.Schedule.Shows[0].Show.filter(show => {
          const showStartTime = new Date(show.dttmShowStart[0]);
          return showStartTime > today;
        });
        futureShows.sort((a, b) => new Date(a.dttmShowStart[0]) - new Date(b.dttmShowStart[0]));

        // Näyttää vain 4 näytösaikaa sidebarissa
        const shows = futureShows.slice(0, 4);
        setShowtimes(shows);
      } catch (error) {
        console.error("Failed to fetch showtimes:", error);
      }
    };

    getSchedule();

    const interval = setInterval(() => {
      getSchedule();
    }, 900000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="sidebar">
      <div className='sidebarcontent moviefiltered'>
        <h2>Movies</h2>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/top100', { state: { filter: 'movie/top_rated' } }); }}>
          Top 100
        </a>
        <Link to='/creategroup'><button>Create Group</button></Link>
      </div>
      <div className='sidebarcontent tvseriesfiltered'>
        <h2>TV Series</h2>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/top100', { state: { filter: 'tv/top_rated' } }); }}>
          Top 100
        </a>
        <a href="#">Dolor!</a>
        <a href="#">Architecto?</a>
        <a href="#">Sapiente.</a>
        <a href="#">Odit.</a>
        <a href="#">Recusandae!</a>
        <a href="#">Repellat!</a>
        <a href="#">Architecto?</a>
        <a href="#">Soluta.</a>
        <a href="#">Assumenda!</a>

      </div>
      <div className='sidebarcontent showtimes'>
        <Link to={'/showtimes'}>
          <h2>Showtimes</h2>
        </Link>
        {showtimes.map((show, index) => (
          <div key={show.id}>{show.Theatre[0]} - {show.Title[0]} - {show.dttmShowStart[0]}</div>
        ))}
      </div>
    </div>
  )
}