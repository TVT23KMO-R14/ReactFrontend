import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import ReviewMovie from '../components/ReviewMovie'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../context/useUser'

export default function MovieView() { 
    
        const [movie, setMovie] = useState(null)
        const { id } = useParams()
        const { user } = useUser()
    
        React.useEffect(() => {
            const fetchMovie = async () => {
                try {
                    const response = await axios.get(process.env.REACT_APP_SERVER_URL + 'search/onemovie', {
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
                <MovieCard movie={movie} />
                {user && <ReviewMovie movie={movie} />}
            </div>
        )
    
    }

