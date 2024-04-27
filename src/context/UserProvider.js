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
        setUser({...data,"token":token})
        setUser({...data,"id":id})
        sessionStorage.setItem("user", user)
        sessionStorage.setItem("id", id)
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