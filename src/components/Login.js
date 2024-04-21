import React, { useState } from 'react';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure your project setup supports CSS imports like this
import  axios  from 'axios';

function Login() {
    const [loginData, setLoginData] = useState ({
      userName: '',
      password: ''
    })

    const [signupData, setSignupData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: ''
    });

    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
    const handleSignupChange = (e) => {
      const { name, value } = e.target;
      setSignupData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleLoginSubmit = async (event) => {
      event.preventDefault();
      console.log("Login form submitted");
      const url = process.env.REACT_APP_SERVER_URL + 'auth/login'; // Adjust this URL based on your backend
      try {
          const response = await axios.post(url, loginData);
          console.log('Login successful:', response.data);
          // Handle login success (e.g., storing the token, redirecting)
      } catch (error) {
          console.error('Login failed:', error);
          // Handle login error (e.g., showing error message)
      }
  };

    const handleSignupSubmit = async (event) => {
      event.preventDefault();  // Prevent default form submission
      console.log("Signup form submitted");
      const url = process.env.REACT_APP_SERVER_URL + 'auth/register';  // Replace with your backend endpoint
      try {
        const response = await axios.post(url, signupData);
        console.log('Server response:', response.data);
        // Handle success here (e.g., display a message, redirect, etc.)
      } catch (error) {
        console.error('Failed to submit:', error);
        // Handle errors here (e.g., display error messages)
      }
    };

  return (
    <div className="loginbody">
      <div className='loginmain'>
        <input type='checkbox' id='chk' aria-hidden='true' />
        <div className='loginlogin'>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor='chk' aria-hidden='true'>Login</label>
            <input type='text' name='userName' placeholder='User name' required onChange={handleLoginChange} value={loginData.userName}/>
            <input type='password' name='password' placeholder='Password' required onChange={handleLoginChange} value={loginData.password}/>
            <button type='submit'>Login</button>
          </form>
        </div>

        <div className='signup'>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor='chk' aria-hidden='true'>Sign up</label>
            <input type='text' name='firstName' placeholder='First name' required onChange={handleSignupChange} value={signupData.firstName} />
            <input type='text' name='lastName' placeholder='Last name' required onChange={handleSignupChange} value={signupData.lastName} />
            <input type='text' name='userName' placeholder='User name' required onChange={handleSignupChange} value={signupData.userName} />
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
