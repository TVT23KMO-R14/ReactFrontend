
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function FetchAllReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setError('');
        axios.get(process.env.REACT_APP_SERVER_URL + 'review/all')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((err) => {
                setError(err.message || 'An error occurred but no error message was received.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Card>
            <Card.Header>Reviews</Card.Header>
            <ListGroup variant="flush">
                {reviews.map((review) => (
                    <ListGroup.Item key={review.idReview}>
                        <Card.Title>{review.reviewObjectName}</Card.Title>
                        <Card.Text>Review: {review.review}</Card.Text>
                        <Card.Text>by user: {review.userName}</Card.Text>
                        <Card.Text>Rating: {review.rating}</Card.Text>
                        <img
                            src={review.reviewImg}
                            style={{ width: '100px', height: '100px' }}
                        />
                        <Card.Text></Card.Text>
                        {review.reviewType && (
                            <Link to={`/moviepage/${review.idMovie}`}>
                                Go to Movie
                            </Link>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
}

