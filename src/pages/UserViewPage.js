import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useUser } from '../context/useUser'
import UserView from '../components/UserView'
import FetchReviews from '../components/FetchReviewsByUser'
import FetchGroupsByUser from '../components/FetchGroupsByUser'
import FetchUserInformation from '../components/FetchUserInformation'
import FetchInvites from '../components/FetchInvites'
import './UserViewPage.css'
import { Card, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'



export default function UserViewPage() {

    const { user } = useUser()
    const [createGroup, setCreateGroup] = useState(false)


    if (!user) return <Navigate to="/login" />

    if (createGroup) {
        return <Navigate to="/creategroup" />
    }

    return (
        <>
            <Card>
                <Card.Header class="header">User Page</Card.Header>
                <Card.Body>
                    <Card.Title>Tervetuloa, {user.username}</Card.Title>
                </Card.Body>
            </Card>
            <UserView />
            <div>
                <Button variant="primary" onClick={() => setCreateGroup(true)}>Create Group</Button>
            </div>
            <FetchUserInformation />
            <FetchInvites />
            <FetchGroupsByUser />
            <FetchReviews />
        </>
    )
}
