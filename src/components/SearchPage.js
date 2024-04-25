
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';

const SearchResultsPage = ({ fromYear, toYear }) => {
   
    const location = useLocation();
    const [results, setResults] = useState([]);


    useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);
        }
    }, [location]);

    const filteredResults = useMemo(() => {
        return results.filter(movie => {
            const releaseDate = movie.release_date || movie.first_air_date;
            if (!releaseDate) return false; 

            const releaseYear = parseInt(releaseDate.split('-')[0], 10);
            const fromYearCheck = !fromYear || releaseYear >= parseInt(fromYear, 10);
            const toYearCheck = !toYear || releaseYear <= parseInt(toYear, 10);
            return fromYearCheck && toYearCheck;
        });
    }, [fromYear, toYear, results]);
    

    const movieItems = filteredResults.map((movie) => (
        <div key={movie.id} className="movie-item">
            <img
                className='movie-poster'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title || movie.name} Poster`}
            />
            <div className="movie-info">
                <h4>{movie.title || movie.name}</h4>
                <p>{movie.release_date ? `Release Date: ${movie.release_date}`
                    : movie.first_air_date ? `First Air Date: ${movie.first_air_date}`
                        : 'Date Unknown'}
                </p>
            </div>
        </div>
    ));

    return (
        <div className='content'>
            <div className='search-result-page'>
                {filteredResults.length > 0 ? (
                    <div className='movie-list'>
                        {movieItems}
                    </div>
                ) : (
                    <p>No movies or tv shows found for the wanted year.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;

