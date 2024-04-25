import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../context/useUser'
import UserView from '../components/UserView'
import FetchReviews from '../components/FetchReviewsByUser'

export default function UserViewPage() {

    const { user } = useUser()
    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <div>Tervetuloa, {user.username}</div>
            <UserView />
            <FetchReviews />
        </div>
    )
}
