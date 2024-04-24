

import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchResultsPage = ({ fromYear }) => {
    /*
        const location = useLocation();
        const [searchParams] = useSearchParams(); // for from year
        const fromYear = searchParams.get('fromYear'); // this too for year
        const [results, setResults] = useState([]);*/

    const location = useLocation();
    const [searchParams] = useSearchParams();
    // const fromYearParam = searchParams.get('fromYear');
    // const [fromYear, setFromYear] = useState(fromYearParam || '');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);
        }
    }, [location]);

    const filteredResults = useMemo(() => {
        return results.filter(movie => {
            const releaseDate = movie.release_date || movie.first_air_date;
            if (!releaseDate) return false; // Skip movies without a release date or first air date

            const releaseYear = parseInt(releaseDate.split('-')[0], 10);
            return !fromYear || releaseYear >= parseInt(fromYear, 10);
        });
    }, [fromYear, results]);
    /*
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
    
    export default SearchResultsPage;*/

    const renderMovies = filteredResults.map((movie) => (
        <div className='content'>
            <div className='search-result-page'>
            <div className='movie-list'>
                <div key={movie.id} className="movie-item">
                    <img className='movie-poster'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title || movie.name} Poster`}
                    />
                    <div className="movie-info">
                        <h4>{movie.title || movie.name}</h4>
                        <p>
                            {movie.release_date || movie.first_air_date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    ));

    return (
        <div className="search-results-container">
            {renderMovies.length > 0 ? (
                <div className="movies-grid">
                    {renderMovies}
                </div>
            ) : (
                <p>No movies found for the selected year.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;

