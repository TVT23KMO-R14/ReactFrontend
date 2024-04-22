import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/useUser'

export default function UserView() {
  const { user } = useUser
  if (user === null) {
    return <Navigate to='/login' />
  }
  return (
    <div>UserView</div>
  )
}
