import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useUser } from '../context/useUser'
import axios from 'axios'

export default function LeaveGroupButton({ group }) {
    const { user } = useUser()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [userInGroup, setUserInGroup] = useState(null)
    const [leaveText, setLeaveText] = useState('')
    var userId = null
    var groupId = null

    if (user){
    userId = user.id
    groupId = group
    }

    const handleLeaveGroup = () => {
        try {
            sendLeaveRequest()
        } catch (error) {
            console.error(error)
            alert('Failed to send leave request')
        }
    }

    const sendLeaveRequest = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'group/leave', {
                userId: userId,
                groupId: groupId
            })
            console.log(response)
            alert('Leave request sent')
            handleClose()
        } catch (error) {
            console.error(error)
            alert('Failed to send leave request')
        }
    }
    
    if (!user) return null

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Leave group
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ryhmän nimi tulee tähän</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Reason for leaving:</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="We will miss you"
                                value={leaveText} onChange={(e) => setLeaveText(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLeaveGroup}>
                        Leave Group
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
