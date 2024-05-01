import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/useUser'
import UserView from '../components/UserView'
import FetchReviews from '../components/FetchReviewsByUser'
import FetchGroupsByUser from '../components/FetchGroupsByUser'
import FetchUserInformation from '../components/FetchUserInformation'
import FetchInvites from '../components/FetchInvites'
import './UserViewPage.css'
import { Card } from 'react-bootstrap'


export default function UserViewPage() {

    const { user } = useUser()
    if (!user) return <Navigate to="/login" />

    return (
        <>
            <Card>
                <Card.Header class="header">User Page</Card.Header>
                <Card.Body>
                    <Card.Title>Tervetuloa, {user.username}</Card.Title>
                </Card.Body>
            </Card>
            <UserView />
            <FetchUserInformation />
            <FetchInvites />
            <FetchGroupsByUser />
            <FetchReviews />
        </>
    )
}
