import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useUser } from '../context/useUser'
import axios from 'axios'

export default function JoinGroupButton({ group }) {
    const { user } = useUser()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [inviteText, setInviteText] = useState('')
    if (!user) return null
    const userId = user.id
    const groupId = group

    const handleJoinGroup = () => {
        try {
            sendInviteRequest()
        } catch (error) {
            console.error(error)
            alert('Failed to send invite request')
        }
    }

    const sendInviteRequest = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'invite/add', {
                userId: userId,
                groupId: groupId,
                inviteText: inviteText
            })
            console.log("inviteText: ", inviteText)
            alert('Invite request sent', inviteText || 'no text')
            handleClose()
        } catch (error) {
            console.error(error)
            alert('Failed to send invite request')
        }
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Join group
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ryhmän nimi tulee tähän</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Join Request:</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Write a message to the group admin..."
                                value={inviteText} onChange={(e) => setInviteText(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleJoinGroup}>
                        Send Invite Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
