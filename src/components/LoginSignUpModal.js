import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './LoginSignUpModal.css'


function LoginSignUpModal() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
    <Button variant="primary" onClick={handleShow}>
    Login
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Body>
        {!showSignUp ? (
          <div className="loginForm">
            <Form>
              <h2>Login</h2>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <Button variant="link" onClick={() => setShowSignUp(true)}>Sign Up</Button>
          </div>
        ) : (
          <div className="signUpForm">
            <Form>
              <h2>Sign Up</h2>
              <Form.Group controlId="formBasicUsername">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
            <Button variant="link" onClick={() => setShowSignUp(false)}>Login</Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
    </>
  );
}

export default LoginSignUpModal;
