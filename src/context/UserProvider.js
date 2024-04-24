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
        console.log(response.data.jwtToken)
        const token = response.data.jwtToken
        console.log({...data,"token":token})
        setUser({...data,"token":token})
        sessionStorage.setItem("user", user)
        navigate("/userview")
      })
      .catch(error => {
        throw error
      })
  }



  return (
    <UserContext.Provider value={{user,setUser,login}}>
      { children } 
    </UserContext.Provider>
  )
}