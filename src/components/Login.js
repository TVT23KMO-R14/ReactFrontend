import React from 'react';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure your project setup supports CSS imports like this

function Login() {
  return (
    <div className="loginbody">
      <div className='loginmain'>
        <input type='checkbox' id='chk' aria-hidden='true' />
        <div className='loginlogin'>
          <form>
            <label htmlFor='chk' aria-hidden='true'>Login</label>
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='pswd' placeholder='Password' required />
            <button type='submit'>Login</button>
          </form>
        </div>

        <div className='signup'>
          <form>
            <label htmlFor='chk' aria-hidden='true'>Sign up</label>
            <input type='text' name='txt' placeholder='User name' required />
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='pswd' placeholder='Password' required />
            <button type='submit'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
