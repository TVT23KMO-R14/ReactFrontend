import React from 'react'
import axios from 'axios'
import { useUser } from '../context/useUser'
import { useState, useEffect } from 'react'
import ListInvites from './ListInvites'


export default function FetchInvites() {
    const { user } = useUser()
    const [invites, setInvites] = useState([])
    const [showinvites, setShowInvites] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        setError('')
        axios.get(process.env.REACT_APP_SERVER_URL + 'invite/bygroupadmin', {
            params: { userId: user.id }
        })
            .then((response) => {
                console.log(response.data.message)
                if (response.data.message === 'No invites found') {
                    setInvites([])
                    setShowInvites(false)
                }else{
                    setInvites(response.data)
                    setShowInvites(true)
                }
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
        showinvites &&
        <ListInvites invites={invites} />
    )
}
