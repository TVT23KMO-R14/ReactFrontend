import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useUser } from '../context/useUser'
import axios from 'axios'

export default function AcceptInviteRequestButton({ invite }) {
    const { user } = useUser()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const userId = user.id
    const groupId = invite.group_idGroup
    const inviteId = invite.idGroupInvite
    const invitedUserId = invite.inviteUserId


    const handleAcceptInviteRequest = () => {
        try {
            sendAcceptInviteRequest()
        } catch (error) {
            console.error(error)
            alert('Failed to send invite request')
        }
    }

    const sendAcceptInviteRequest = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'groupMember/add', {
                userId: invitedUserId,
                groupId: groupId,
                role: 'member'
            })
            .then(() => {
                try {
                    sendDeleteInviteRequest()
                } catch (error) {
                    console.error(error)
                    alert('Failed to delete invite request')
                }
            })
            console.log("Accept invite request sent", response)
            handleClose()
            

        } catch (error) {
            console.error(error)
            alert('Failed to accept invite request')
        }
    }

    const sendDeleteInviteRequest = async () => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL + 'invite/remove?idInvite=' + inviteId)
            console.log("Delete invite request sent", response)
            handleClose()
        } catch (error) {
            console.error(error)
            alert('Failed to delete invite request')
        }
    }

    const handleDeclineInviteRequest = () => {
        try {
            sendDeclineInviteRequest()
        } catch (error) {
            console.error(error)
            alert('Failed to decline invite request handlerDeclineInviteRequest')
        }
    }

    const sendDeclineInviteRequest = async () => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL + 'invite/remove?idInvite=' + inviteId)
            console.log("Decline invite request sent", response)
            handleClose()
        } catch (error) {
            console.error(error)
            alert('Failed to decline invite request sendDeclineInviteRequest')
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Accept invite
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ryhmän nimi tulee tähän</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tähän vaikka userin nimi ja poistumisyyteksti</p>
                    <p>Invite id: {inviteId}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={handleDeclineInviteRequest}>
                        Decline Invite
                    </Button>
                    <Button variant="primary" onClick={handleAcceptInviteRequest}>
                        Accept Invite
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
