import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap';
import { useUser } from '../context/useUser'

export default function GroupMemberList({ groupid }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [kickMessage, setKickMessage] = useState('');
    const [userId, setUserId] = useState(null)
    const [members, setMembers] = useState([])
    const { user } = useUser()
    const [isMember, setIsMember] = useState(false);
    console.log(groupid)

    const handleOpen = () => {
        setShow(true)
    };

    useEffect(() => {
        if (userId) setShow(true)
        console.log(userId)
    }, [userId])

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/groupMember/membersbygroup', { params: { groupId: groupid } });
                setMembers(response.data);

                if (response.data.some(member => member.user_idUser === user.id)) {
                    setIsMember(true);
                }
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [groupid]);

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
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL + 'groupMember/remove?userId=' + userId + '&groupId=' + groupid)
            console.log(response)
            alert('Leave request sent')
            handleClose()
        } catch (error) {
            console.error(error)
            alert('Failed to send leave request')
        }
    }

    console.log(members)

    return (
        <>
            <ul>
                {
                    members.map(member => (
                        <span>
                            <li id='member-list' key={member.userId}>
                                {member.userName} - {member.role} -
                                {isMember && member.role !== 'admin' && (
                                <Button data-bs-dismiss="offcanvas" onClick={() => {
                                    setUserId(member.user_idUser)
                                }} variant="danger">
                                    Kick Member
                                </Button>
)}
                            </li>
                        </span>
                    ))
                }
            </ul>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Kick</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Why you want to kick this member?</p>
                    <Form.Control
                        type='text'
                        placeholder="Send a message to the member..."
                        value={kickMessage}
                        onChange={(e) => setKickMessage(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleLeaveGroup}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
