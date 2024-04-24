import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/useUser'

export default function UserView() {
  const { user } = useUser
  const testi1 = () => {
    if (user === null) {
      return "nulli"
    } else {
      if (user === undefined) {
        return "undefined"
      } else {
        if (user === "") {
          return "tyhjä"
        }
      }
      return "ei nulli"
    }
  }

  console.log(testi1())

  if (user === null || user === "") {
    return <Navigate to='../auth/login' />
  }
  return (
    <div>
      <div>UserView</div>
      <div>{testi1()}</div>

    </div>
  )
}

