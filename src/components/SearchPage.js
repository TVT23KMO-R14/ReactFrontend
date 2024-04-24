
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';

const SearchResultsPage = () => {

    const location = useLocation();
    const [results, setResults] = useState([]);



// muuttaa uuden location jos on results
   useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);
        }
    }, [location.state]);




    return (
        <div className='content'>
            <div className='search-result-page'>
                <div className='movie-list'>
                    {results.map((movie) => (
                        <div key={movie.id} >
                            <img
                                className='movie-poster'
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`${movie.title || movie.name} Poster`}
                            />
                            <div className='movie-info'>
                                <h4>{movie.title || movie.name}</h4>
                            </div>
                            <div className='time'>
                            <h4>{movie.release_date ? `Release Date: ${movie.release_date}`
                             : movie.first_air_date ? `First Air Date: ${movie.first_air_date}`
                            : 'Date Unknown'}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;