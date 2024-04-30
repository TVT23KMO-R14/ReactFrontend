
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchResultsPage = ({ fromYear, toYear, selectedGenreId, sortOrder }) => {

    const location = useLocation();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);

        }
    }, [location]);

    //useMemo muistaa filteröidyt tulokset julkiaisu vuodella ja genrellä,
    // näyttää rajatut tulokset halutuilla rajoituksilla
    const filteredResults = useMemo(() => {
        return results.filter(movie => {
            const releaseDate = movie.release_date || movie.first_air_date;
            if (!releaseDate) return false;

            const releaseYear = parseInt(releaseDate.split('-')[0], 10);
            const fromYearCheck = !fromYear || releaseYear >= parseInt(fromYear, 10);
            const toYearCheck = !toYear || releaseYear <= parseInt(toYear, 10);

            const genreCheck = !selectedGenreId || movie.genre_ids.includes(selectedGenreId);
            //console.log("Current selected genre ID:", selectedGenreId);


            return fromYearCheck && toYearCheck && genreCheck;
        });
    }, [fromYear, toYear, results, selectedGenreId]);

    // sorting
    const sortFunction = (a, b) => {
        const itemA = a.title || a.name;
        const itemB = b.title || b.name;


        if (sortOrder === 'ascending') {
            if (itemA < itemB) return -1;
            if (itemA > itemB) return 1;
            return 0;
        } else if (sortOrder === 'descending') {
            if (itemA < itemB) return 1;
            if (itemA > itemB) return -1;
            return 0;
        }
        return 0;
    };
    const sortedResults = useMemo(() => {
        if (sortOrder === 'none') {
            return filteredResults;
        } else {
            return [...filteredResults].sort(sortFunction);
        }
    }, [filteredResults, sortOrder]);


    const movieItems = sortedResults.map((movie) => { 
        const isMovie = movie.hasOwnProperty('title');


        // Navigoi riippuen jos tulos on elokuva tai tv sarja
        const navigateUrl = isMovie ? `/moviepage/${movie.id}` : `/seriespage/${movie.id}`;

        return (
            <div key={movie.id} onClick={() => navigate(navigateUrl)} className="movie-item">
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
        );
    });

    return (
        <div className='content'>
            <div className='search-result-page'>
                {sortedResults.length > 0 ? (
                    <div className='movie-list'>
                        {movieItems}
                    </div>
                ) : (
                    <p>No movies or tv shows found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;

