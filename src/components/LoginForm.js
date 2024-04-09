import React from 'react';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure your project setup supports CSS imports like this

function LoginForm() {
  return (
    <div className="container-fluid">
      <form className="mx-auto">
        <h4 className="text-center">Login</h4>
        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
          <div id="emailHelp" className="form-text mt-3">Forget password?</div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
