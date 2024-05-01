import React from 'react'
import axios from 'axios'
import { useUser } from '../context/useUser'
import { useState, useEffect } from 'react'
import ListReviews from './ListReviews'


export default function FetchReviewsByUser() {
    const { user } = useUser()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        setError('')
        axios.get(process.env.REACT_APP_SERVER_URL + 'review/all', {
            params: { idUser: user.id }
        })
            .then((response) => {
                setReviews(response.data)
            })
            .catch((err) => {
                setError(err.message || 'An error occurred but no error message was received.')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [user])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <ListReviews reviews={reviews} />
    )
}