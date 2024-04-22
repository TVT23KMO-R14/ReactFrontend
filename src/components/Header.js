
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './Header.css';
import { Link } from "react-router-dom";
import { useUser } from '../context/useUser';

export default function Header({ onMovieSelect }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Suoritaa haun ja päivitä elokuvamuuttuja vastauksen mukaan. Debounce viive tapahtuu joka 300 ms
    const debouncedSearch = useCallback(
        debounce(async (searchTerm) => {
            if (!searchTerm) return;
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(process.env.REACT_APP_SERVER_URL + 'search/headersearch', {
                    params: { query: searchTerm }
                });
                setMovies([...response.data.movies, ...response.data.tvShows]);
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

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

    return (
        <div className='header'>
            <div className='search-container'>
                <form onSubmit={(e) => { e.preventDefault(); debouncedSearch(search); }}>
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
                <div className="search-results" style={{ display: movies.length > 0 ? 'block' : 'none' }}> {/* This div is for absolute positioning */}
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
            <div className='title'>
                <Link to='/'>Movie Mayhem</Link>
            </div>
            <div className='login'>
                <li>
                    <Link to='/login'>Login <span className='material-symbols-outlined'>person</span></Link>
                </li>
            </div>
        </div>
    );
}


