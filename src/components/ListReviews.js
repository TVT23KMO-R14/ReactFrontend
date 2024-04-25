import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'


export default function ListReviews({ reviews }) {

//https://react-bootstrap.netlify.app/docs/components/list-group/

    return (
        <Card>
            <Card.Header>Reviews</Card.Header>
            <ListGroup variant="flush">
                {reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                        <Card.Text>{review.review}</Card.Text>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    )
}