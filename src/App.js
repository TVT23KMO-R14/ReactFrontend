import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
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
import CreateGroup from './components/CreateGroup'
import GroupPage from './pages/GroupPage';
import UserProvider from './context/UserProvider';
import ReviewMovie from './components/ReviewMovie';
import MoviePage from './pages/MoviePage'
import SearchResultsPage from './components/SearchPage';
import SeriesPage from './pages/SeriesPage';
import UserViewPage from './pages/UserViewPage';
import Logout from './components/Logout';
import AdvancedSearchbar from './components/AdvancedSearchbar';
import GroupListPage from './components/GroupListPage';
import BrowseGroups from './pages/BrowseGroups';
import BrowseReviews from './pages/BrowseReviews';
import FetchAllReviews from './components/FetchAllReviews';


function App() {

  const [setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`/moviepage/${movie.id}`);
  };

  const showSidebar = location.pathname !== '/login';

  //Näillä pystyy handlaa headerin ja footerin piilottamisen tarvittaessa.
  //const showHeader = location.pathname !== '/login';
  //const showFooter = location.pathname !== '/login'; 

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [sortOrder, setSortOrder] = useState('none');

  


  useEffect(() => {
    if (location.pathname !== '/search') {
      setShowAdvancedSearch(false);
    }
  }, [location]);

  return (
    <UserProvider>
      <div className='viewport'>
        <div className='container'>
          <Header setMovies={setMovies} onMovieSelect={handleMovieSelect}
          setShowAdvancedSearch={setShowAdvancedSearch}  />
          {showAdvancedSearch && <AdvancedSearchbar  setFromYear={setFromYear}
            toYear={toYear} setToYear={setToYear} 
            selectedGenreId={selectedGenreId}  setSelectedGenreId={setSelectedGenreId} 
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder}/>}
          <div className='main'>
            {showSidebar && <Sidebar />}
            <div className='content'>
              <Routes>
                  <Route path='/' element={<>
                  <Carousel />
                  <Content />
                </>} />
                <Route path="/top100" element={<Top100 />} />
                <Route path='/creategroup' element={<CreateGroup />} />
                <Route path='/grouppage' element={<GroupPage />} />
                <Route path="/movie/:id" element={<>
                  <MovieCard movie={selectedMovie} />
                  <ReviewMovie />
                </>} />
                <Route path='/moviepage/:id' element={<MoviePage />} />
                <Route path='/seriespage/:id' element={<SeriesPage />} />
                <Route path='/search' element={<SearchResultsPage fromYear={fromYear} toYear={toYear}
                  selectedGenreId={selectedGenreId}  setSelectedGenreId={setSelectedGenreId}
                  setSortOrder={setSortOrder} sortOrder={sortOrder} />} />
                <Route path='/showtimes' element={<ShowtimeDetails />} />
                <Route path='/showtimes/news' element={<NewsDetails />} />
                <Route path='/login' element={<Login />} />
                <Route path='/userview' element={<UserViewPage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/groupList' element={<GroupListPage />} />
                <Route path='/browsegroups' element={<BrowseGroups />} />
                <Route path='/browsereviews' element={<BrowseReviews />} />
                <Route path='/allreviews' element={<FetchAllReviews />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
