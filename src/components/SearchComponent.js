
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import './AdvancedSearchbar';

export default function SearchComponent({ onMovieSelect, setShowAdvancedSearch }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [searchButtonPressed, setSearchButtonPressed] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const dropdownRef = useRef(null);


    // Suoritaa haun ja päivitä elokuvamuuttuja vastauksen mukaan. Debounce viive tapahtuu joka 300 ms
    const debouncedSearch = useCallback(
        debounce(async (searchTerm, shouldShowDropdown = true) => {
            if (!searchTerm) return;
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(process.env.REACT_APP_SERVER_URL + 'search/headersearch', {
                    params: { query: searchTerm }
                });
                setMovies([...response.data.movies, ...response.data.tvShows]);
                if (shouldShowDropdown) {
                    setIsDropdownVisible(true);
                  }
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );


    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchButtonPressed(true);
        setIsDropdownVisible(false);
        debouncedSearch(search,false);
    };

    // Kun debounceSearch on tehty movies state päivitetään viimeisellä haulla 
    useEffect(() => {
        if (movies.length > 0 && searchButtonPressed) {
            navigate('/search', { state: { results: movies } });
            setShowAdvancedSearch(true);
            setSearchButtonPressed(false);
        }
    }, [movies, navigate, searchButtonPressed, setShowAdvancedSearch]);

    useEffect(() => {
        if (search === '') {
            setMovies([]);
        } else {
            debouncedSearch(search);
        }
        // Cancellataan haku jos haku postuu
        return () => debouncedSearch.cancel();
    }, [search, debouncedSearch]);


    // Päivitää hakutermin, kun kirjoitetaa hakukenttään
    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    // hakutermit käsitellään
    const handleMovieSelection = (movie) => {
        onMovieSelect(movie);
        setMovies([]);
        setSearch('');
    };


    useEffect(() => {
        if (search) {
            debouncedSearch(search);
        }
        return () => debouncedSearch.cancel();
    }, [search, debouncedSearch]);


    return (
        <div className='search-container'>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={handleChange}
                    value={search}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="search-results"  ref={dropdownRef} style={{ display: isDropdownVisible ? 'block' : 'none' }}>
                <ul className="list-group">
                    {movies.map((movie, index) => (
                        <li key={index}
                            className='list-group-item list-group-item-action'
                            onClick={() => handleMovieSelection(movie)}>
                            {movie.title} ({movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}