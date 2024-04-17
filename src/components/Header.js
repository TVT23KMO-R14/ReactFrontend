

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';

export default function Header({ onMovieSelect }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (search === '') {
            setMovies([]);
        }
    }, [search]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleMovieSelection = (movie) => {
        onMovieSelect(movie);
        setMovies([]);
        setSearch('');
    };

const searchMovies = async (event) => {
    event.preventDefault();
    if (!search) return;
    setLoading(true);
    setError('');
    try {
        const response = await axios.get('http://localhost:3000/search/headersearch', {
            params: {
                page: 1,
                query: search
            }
        });
        setMovies([...response.data.movies, ...response.data.tvShows]); 
    } catch (err) {
        setError(err.response && err.response.data.error ? err.response.data.error : 'Something did not work');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className='header'>
            <div className='search'>
                <form onSubmit={searchMovies}>
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
                {movies.length > 0 && (
                    <ul className="list-group">
                        {movies.map((movie, index) => (
                            <li key={index} 
                                className='list-group-item list-group-item-action' 
                                onClick={() => handleMovieSelection(movie)}>
                                {movie.title} ({movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='title'>
                <h2>Front Page</h2>
            </div>
            <div className='login'>
                <a href='#'>Login</a>
                <span className='material-symbols-outlined'>person</span>
            </div>
        </div>
    );
}

