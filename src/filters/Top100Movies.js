import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Top100Movies.css'
const API_KEY = 'YOUR_API_KEY_HERE'

export default function Movie() {
    const [movies, setMovies] = useState([])

    const getMovie = async () => {
        const allMovies = []
        for (let page = 1; page <= 5; page++) {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`)
            allMovies.push(...response.data.results)
        }
        setMovies(allMovies)

        console.log(allMovies)
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div className='movie-list-top100'>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <div className='movie-top100'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                        <div className='layer'>
                            <h1>{movie.title}</h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
