import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function MovieByPath() {

    const [movie, setMovie] = useState(null)
    const { id } = useParams()

    React.useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_SERVER_URL + 'search/getonemovie', {
                    params: { id }
                })
                if(response.data.length === 0) return console.log('No movie found:' + response)
                setMovie(response.data)
            } catch (error) {
                console.error('Error fetching movie', error)
            }
        }
        fetchMovie()
    }, [id])

    if (!movie) return null

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
            <p>{movie.overview}</p>
        </div>
    )

}


