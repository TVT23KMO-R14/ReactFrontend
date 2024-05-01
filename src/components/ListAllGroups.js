import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function AllGroupsPage() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3000/group/all');
                /*for (let group of groups) {
                    const membersResponse = await axios.get(`http://localhost:3000/groupMember/all?groupId=${group.idGroup}`);
                    group.members = membersResponse.data;
                }*/
                setGroups(response.data);
                
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }
        fetchGroups()
    }, [])
    
    return (
        <Card>
            <Card.Header>All Groups{console.log("ryhmät:", groups)}</Card.Header>
            <ListGroup variant="flush">
                {groups.map((group) => (
                    <ListGroup.Item className="listgroups" key={group.idGroup} onClick={() => navigate('/grouppage', { state: { idGroup: group.idGroup } })}>
                        <Row>
                            <Col md={group.groupLogo ? 9 : 12}>
                                <Row>
                                    <Col>
                                        <Card.Title>{group.groupName}
                                        </Card.Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>{group.groupDescription}</Card.Text>
                                    </Col>
                                </Row>
                            </Col>
                            {group.groupLogo && (
                                <Col md={3} className="group-logo">
                                    <img
                                        src={group.groupLogo}
                                        alt="Group Logo"
                                        style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'cover' }}
                                    />
                                </Col>
                            )}
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    )
}
