import React from 'react'
import axios from 'axios'
import { useUser } from '../context/useUser'
import { useState, useEffect } from 'react'
import ListGroups from './ListGroups'


export default function FetchGroupsByUser() {
    const { user } = useUser()
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        setError('')
        axios.get(process.env.REACT_APP_SERVER_URL + 'groupmember/bymember', {
            params: { userId: user.id }
        })
            .then((response) => {
                setGroups(response.data)
                console.log(response.data)
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
        <ListGroups groups={groups} />
    )
}