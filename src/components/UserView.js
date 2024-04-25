import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/useUser'

export default function UserView() {


// if (user === undefined || user === null || user === "") {
//   return <Navigate to='../auth/login' />
//  }
  return (
    <div>
      <div>UserView - Tämä on UserView.js komponentista</div>
    </div>
  )
}

