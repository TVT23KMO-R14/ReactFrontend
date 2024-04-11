import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/MainSidebar'
import Footer from './components/Footer'
import Content from './components/Content'
import Carousel from './components/ImgCarousel'
import Top100 from './filters/Top100'
import MovieCard from './components/MovieCard';
import Login from './components/Login';

function App() {

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`); 
  };

  const showSidebar = location.pathname !== '/login';
  const showHeader = location.pathname !== '/login';
  const showFooter = location.pathname !== '/login';

  return (
    <div className='viewport'>
      <div className='container'>
      <Header setMovies={setMovies} onMovieSelect={handleMovieSelect} />
        <div className='main'>
        {showSidebar && <Sidebar />}
          <Routes>
            <Route path='/' element={
              <div className='content'>
              <Carousel />
              <Content />
            </div>
            } />
            <Route path="/other" element={
              <div className='content'>
                <Top100 />
              </div>
            } />
             <Route path="/movie/:id" element={<MovieCard movie={selectedMovie} />}/>
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
       <Footer />
      </div>
    </div>
  );
}

export default App;
