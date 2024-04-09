import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import Example from './Example';
import LoginForm from './LoginForm';
import LoginSignUpModal from './LoginSignUpModal';

export default function Header({ onMovieSelect }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const Api_key = '53a7bc707469e2735d76b776a9b92595';

    useEffect(() => {
        if (search === '') {
            setMovies([]);
        }
    }, [search]);


    
    const searchMovies = async (event) => {
        event.preventDefault();
        if (!search) return;
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: Api_key,
                    query: search,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                }
            });
            setMovies(response.data.results);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : 'Something did not work');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };


    const handleMovieSelection = (movie) => {
        onMovieSelect(movie);
        setMovies([]);
        setSearch('');
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
                <span>{LoginSignUpModal()}</span>
                <span className='material-symbols-outlined'>person</span>
            </div>
        </div>
    );
}

