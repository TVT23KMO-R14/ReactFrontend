import React, { useState } from 'react';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure your project setup supports CSS imports like this
import  axios  from 'axios';

function Login() {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();  // Prevent default form submission
      console.log("Form submitted");
      const url = 'http://localhost:3001/auth/register';  // Replace with your backend endpoint
      try {
        const response = await axios.post(url, formData);
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
          <form>
            <label htmlFor='chk' aria-hidden='true'>Login</label>
            <input type='uname' name='uname' placeholder='User name' required />
            <input type='password' name='pswd' placeholder='Password' required />
            <button type='submit'>Login</button>
          </form>
        </div>

        <div className='signup'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='chk' aria-hidden='true'>Sign up</label>
            <input type='text' name='firstName' placeholder='First name' required onChange={handleChange} value={formData.firstName} />
            <input type='text' name='lastName' placeholder='Last name' required onChange={handleChange} value={formData.lastName} />
            <input type='text' name='userName' placeholder='User name' required onChange={handleChange} value={formData.userName} />
            <input type='email' name='email' placeholder='Email' required onChange={handleChange} value={formData.email} />
            <input type='password' name='password' placeholder='Password' required onChange={handleChange} value={formData.password} />
            <button type='submit'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
