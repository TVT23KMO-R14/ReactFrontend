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
import ShowtimeDetails from './components/ShowtimeDetails';
import NewsDetails from './components/NewsFinnkino';
import Login from './components/Login';
import UserView from './components/UserView';
import UserProvider from './context/UserProvider';


function App() {

  const [setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  const showSidebar = location.pathname !== '/login';

  //Näillä pystyy handlaa headerin ja footerin piilottamisen tarvittaessa.
  //const showHeader = location.pathname !== '/login';
  //const showFooter = location.pathname !== '/login'; 

  return (
    <UserProvider>
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
              <Route path="/top100" element={
                <div className='content'>
                  <Top100 />
                </div>
              } />
              <Route path="/movie/:id" element={<MovieCard movie={selectedMovie} />} />
              <Route path='/showtimes' element={<ShowtimeDetails />} />
              <Route path='/showtimes/news' element={<NewsDetails />} />
              <Route path='/login' element={
                <div className='content'>
                  <Login />
                </div>
              } />
              <Route path='/userview' element={<UserView />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
