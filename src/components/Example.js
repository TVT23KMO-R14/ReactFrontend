import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Example.css';
import { useNavigate } from 'react-router-dom'

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='modal-login'> 
        <input type='checkbox' id='chk' aria-hidden='true'></input>
          <div className='signup'>
            <form>
              <label for='chk' aria-hidden='true'>Signup</label>
              <input type='text' name='txt' placeholder='User name' required=''></input>
              <input type='email' name='email' placeholder='Email' required=''></input>
              <input type='Password' name='pswd' placeholder='Password' required=''></input>
              <button>Sign up</button>
            </form>

          </div>
          <div className='loginlogin'>
            <form>
              <label for='chk' aria-hidden='true'>Login</label>
              <input type='email' name='email' placeholder='Email' required=''></input>
              <input type='Password' name='pswd' placeholder='Password' required=''></input>
              <button>Login</button>         
          </form>
          </div>
        </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;