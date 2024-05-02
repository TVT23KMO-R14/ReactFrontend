import React, { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';




export default function ListReviews({ reviews }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Header>Your Reviews</Card.Header>
            <ListGroup variant="flush">
                {reviews.map((review) => (
                    <ListGroup.Item key={review.idReview}>
                        <Card.Title>{review.reviewObjectName}</Card.Title>
                        <Card.Text>{review.review}</Card.Text>
                        <Card.Text>Rating: {review.rating}</Card.Text>
                        <Card.Text><a href="#" onClick={(e) => {
                            e.preventDefault();
                            navigate(`/moviepage/${review.idMovie}`, { state: { objectType: review.reviewType } });
                        }}>Go to {review.reviewType}</a></Card.Text>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
}
