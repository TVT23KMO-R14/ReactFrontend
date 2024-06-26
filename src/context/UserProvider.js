import { useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProvider({children}) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async(data) => {
    const json = JSON.stringify(data)
    console.log(json)
    const options = {
      headers: {
        'Content-Type':'application/json'
      }
    }
    const url = process.env.REACT_APP_SERVER_URL + 'auth/login'
    axios.post(url,json,options)
      .then(response => {
        console.log('jwtToken: ',response.data.jwtToken)
        console.log('id: ',response.data.id)
        const token = response.data.jwtToken
        const id = response.data.id
        const updateUserData = {...data, token:token, id:id}
        setUser(updateUserData)
        console.log('UserProvider token: ',token)
        console.log('UserProvider data.token: ',data.token)
        sessionStorage.setItem("user", user)
        sessionStorage.setItem("id", id)
        sessionStorage.setItem("token", token)
        navigate("/userview")
      })
      .catch(error => {
        console.log(error)
        alert('Login failed, chek your username and password.')
      })
  }
  const logout = () => {
    setUser(null); // Reset the user state
    sessionStorage.removeItem("token"); // Clear stored token
    sessionStorage.removeItem("user"); // If you store user details in session storage, clear them
    navigate('/login'); // Redirect to login page
  };


  return (
    <UserContext.Provider value={{user,setUser,login, logout}}>
      { children } 
    </UserContext.Provider>
  )
}