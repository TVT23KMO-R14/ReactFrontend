import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RangeSlider from 'react-bootstrap-range-slider'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useUser } from '../context/useUser'


export default function ReviewMovie({ movie }) {

    const { user } = useUser()
    const navigate = useNavigate()
    const [reviewInput, setReviewInput] = useState('')
    const [rating, setRating] = React.useState(10)
    const userId = user.id

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const parameters = { idUser: userId, idMovie: movie.id, review: reviewInput, rating: rating }
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'review/add', parameters)
            console.log(process.env.REACT_APP_SERVER_URL + 'review/add')
            console.log(parameters)
            console.log(response.data)
            console.log(movie.id)
            setReviewInput('')
            setRating('')
            window.location.reload();
        } catch (error) {
            console.error('Error adding review', error);
            console.log(userId)
            console.log(reviewInput)
        }
    }

    if (!movie) return null

    return (
        <div className='card' style={{ width: '25rem', display: 'flex', padding: '20px'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRating">
                    <Form.Label>Rating</Form.Label>
                        <RangeSlider
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            min={1}
                            max={10}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formReview">
                    <Form.Label>Review</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e) => setReviewInput(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

