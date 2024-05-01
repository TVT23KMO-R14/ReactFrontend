import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default function UserView() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { user, setUser } = useUser()

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleChangePassword = (event) => setPassword(event.target.value)


  const handleDelete = async (event) => {
    event.preventDefault();
    if (password) {
      const url = `${process.env.REACT_APP_SERVER_URL}auth/delete/${user.username}`;
      console.log('Using token:', user.token);
      try {
        const response = await axios.delete(url, {
          headers: { Authorization: `Bearer ${user.token}` },
          data: {
            userName: user.username,
            password: password
          }
        });
        console.log('Deleting user:', user.username);
        console.log('Response:', response.data);
        setUser(null);
        navigate('/login');
      } catch (error) {
        console.error('Delete failed:', error);
        setError('Failed to delete the user. Please try again.');
      }
      handleClose();
    } else {
      alert('Please enter your password to confirm.');
    }
  };

  if (!user) {
    return <Navigate to='/login' />; // Redirect to login if user is null or undefined
  }

/*
  if (user === undefined || user === null || user === "") {
    return <Navigate to='../' />
  }
*/
  return (
    <div>
      <div>UserView - Tämä on UserView.js komponentista</div>
      <Button variant="danger" onClick={handleOpen}>
        Delete user
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your password to confirm account deletion</p>
          <Form.Control
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Enter your password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
