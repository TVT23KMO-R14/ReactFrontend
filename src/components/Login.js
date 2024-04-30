import React, { useState } from 'react'
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css' // Make sure your project setup supports CSS imports like this
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser'
import ErrorModal from './ErrorModal';


function Login() {
  const [error, setError] = useState('');
  const { login } = useUser()
  const navigate = useNavigate()
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: ''
  });

  const handleLoginChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  };


  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    //if (username.length >0 && password.length >0) {
    const data = { "username": loginData.username, "password": loginData.password }
    try { login(data) } catch (error) { console.log(error) }

    //}
    /*
    event.preventDefault();
    console.log("Login form submitted");
    const url = process.env.REACT_APP_SERVER_URL + 'auth/login'; // Adjust this URL based on your backend
    try {
        const response = await axios.post(url, loginData);
        console.log('Login successful:', response.data);
        console.log(response.data.jwtToken)
        console.log(response.data)
        console.log(Object.keys(response.data.jwtToken).length)
        if (Object.keys(response.data.jwtToken).length > 10) {
          console.log("Navigating to userview")
          navigate('/userview')
        }
        // Handle login success (e.g., storing the token, redirecting)
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error (e.g., showing error message)
    }*/
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_SERVER_URL + 'auth/register';
    try {     
        const response = await axios.post(url, signupData);
        const data = { "username": signupData.userName, "password": signupData.password }
        try { login(data) } catch (error) { console.log(error) }
        navigate('/user');  // Redirect on successful signup
    } catch (error) {
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : 'Username already in use. Choose another one';
      setError(errorMessage);  // Set the error message state
      setShowErrorModal(true);  // Show the modal
    }
  };

  return (
    <div className="loginbody">
      <ErrorModal showError={showErrorModal} errorMessage={error} handleClose={() => setShowErrorModal(false)} />
      <div className='loginmain'>
        <input type='checkbox' id='chk' aria-hidden='true' />
        <div className='loginlogin'>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor='chk' aria-hidden='true'>Login</label>
            <input type='text' name='username' placeholder='Username' required onChange={handleLoginChange} value={loginData.username} />
            <input type='password' name='password' placeholder='Password' required onChange={handleLoginChange} value={loginData.password} />
            <button type='submit'>Login</button>
          </form>
        </div>

        <div className='signup'>
          <form onSubmit={handleSignupSubmit}>          
            <label htmlFor='chk' aria-hidden='true'>Sign up</label>
            <input type='text' name='firstName' placeholder='First name' required onChange={handleSignupChange} value={signupData.firstName} />
            <input type='text' name='lastName' placeholder='Last name' required onChange={handleSignupChange} value={signupData.lastName} />
            <input type='text' name='userName' placeholder='Username' required onChange={handleSignupChange} value={signupData.userName} />
            <input type='email' name='email' placeholder='Email' required onChange={handleSignupChange} value={signupData.email} />
            <input type='password' name='password' placeholder='Password' required onChange={handleSignupChange} value={signupData.password} />
            <button type='submit'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
