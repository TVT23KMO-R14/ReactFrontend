import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../context/useUser'
import UserView from '../components/UserView'
import FetchReviews from '../components/FetchReviewsByUser'
import FetchGroupsByUser from '../components/FetchGroupsByUser'
import FetchUserInformation from '../components/FetchUserInformation'
import FetchInvites from '../components/FetchInvites'
import JoinGroupButton from '../components/JoinGroupButton'


export default function UserViewPage() {

    const { user } = useUser()
    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <div>Tervetuloa, {user.username}</div>
            <JoinGroupButton group={93} />
            <UserView />
            <FetchUserInformation />
            <FetchGroupsByUser />
            <FetchReviews />
            <FetchInvites />
        </div>
    )
}
