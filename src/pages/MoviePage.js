import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import ReviewMovie from '../components/ReviewMovie';
import { useUser } from '../context/useUser';

export default function MovieView() {
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams();
    const { user } = useUser();
    const location = useLocation();
    const objectType = location.state?.objectType || 'movie';
    

    useEffect(() => {
        const fetchMovieAndReviews = async () => {
            try {
                // Fetching movie details
                
                const movieResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}search/one${objectType}`, {
                    params: { id }
                });
                if (movieResponse.data.length === 0) {
                    console.log('No movie found:', movieResponse);
                    return;
                }
                movieResponse.data.objectType = objectType;
                setMovie(movieResponse.data);
                console.log(movieResponse.data);

                // Fetching reviews for the movie
                const reviewResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}review/bymovie`, {
                    params: { idMovie: id }
                });
                setReviews(reviewResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setError(error.message || 'An error occurred while fetching data.');
            }
        };

        fetchMovieAndReviews();
    }, [id]);

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    if (error) {
        //return <p>{error}</p>;
    }

    return (
        <div>
            <MovieCard movie={movie} />
            {user && <ReviewMovie movie={movie} />}
            <Card>
                <Card.Header>Reviews</Card.Header>
                <ListGroup variant="flush">
                    {reviews.map((review) => (
                        <ListGroup.Item key={review.idReview}>
                            <Card.Title>{review.reviewObjectName}</Card.Title>
                            <Card.Text>Review: {review.review}</Card.Text>
                            <Card.Text>By user: {review.userName}</Card.Text>
                            <Card.Text>Rating: {review.rating}</Card.Text>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </div>
    );
}
