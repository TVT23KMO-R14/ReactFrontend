import React, { useEffect } from 'react'
import { useUser } from '../context/useUser'



export default function Logout() {
  const { setUser } = useUser()

    useEffect(() => {
        localStorage.removeItem('user')
        setUser(null)
    }, [])

  return (
    <p>You have logged out.</p>
  )
}