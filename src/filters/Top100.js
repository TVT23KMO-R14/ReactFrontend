import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Top100.css'
import { useLocation } from 'react-router-dom'

export default function Movie() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1);
    const [lastFilter, setLastFilter] = useState('');
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);
        const filter = location.state?.filter || 'default_filter';
        handleSubmit(filter);
    }, [location]);


    const handlePages = async () => {
        if (page === 5) {
            setPage(5);
        } else {
            setPage(page + 1);
            console.log(page);
        }
    }

    const handlePreviousPage = async () => {
        if (page === 1) {
            return;
        } else {
            setPage(page - 1);
            console.log(page);
        }
    }

    useEffect(() => {
        console.log(page);

        if (lastFilter === '') {
            return;
        } else {
            handleSubmit(lastFilter);
        }

    }, [page]);

    const handleSubmit = async (filter) => {
        setLastFilter(filter);
        console.log(filter);

        try {
            const response = await axios.get('http://localhost:3001/search/quicksearch', { params: { filter, page } });
            console.log(response.data.results);
            console.log(response)

            //allMovies.push(...response.data.results)
            setMovies(response.data.results);
            //console.log(allMovies);
            console.log(page);

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };


    return (
        <div className='quicksearch-container'>
            <div className='pagination'>
                <span id='arrowback' class="material-symbols-outlined" onClick={handlePreviousPage}>
                    arrow_circle_left
                </span>
                <span id='arrowforward' class="material-symbols-outlined" onClick={handlePages}>
                    arrow_circle_right
                </span>
            </div>
            <div className='movie-list-top100'>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <div className='movie-top100'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                            <div className='layer'>
                                <h1>{movie.title}</h1>
                                <h1>{movie.name}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
