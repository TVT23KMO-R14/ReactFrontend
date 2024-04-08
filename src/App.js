import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/MainSidebar'
import Footer from './components/Footer'
import Content from './components/Content'
import Carousel from './components/ImgCarousel'
import Top100Movies from './filters/Top100Movies'

function App() {

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`); 
  };




  return (
    <div className='viewport'>
      <div className='container'>
      <Header setMovies={setMovies} onMovieSelect={handleMovieSelect} />
        <div className='main'>
          <Sidebar />
          <Routes>
            <Route path='/' element={
              <div className='content'>
              <Carousel />
              <Content />
            </div>
            } />
            <Route path="/other" element={
              <div className='content'>
                <Top100Movies />
              </div>
            } />
             <Route path="/movie/:id" element={<MovieCard movie={selectedMovie} />}/>
            
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
