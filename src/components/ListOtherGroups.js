import React, { useState, useEffect } from 'react'
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap'
import { useUser } from '../context/useUser'
import axios from 'axios'


export default function ListOtherGroups({ groups }) {

    /*

    const { user } = useUser()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        setError('')
        axios.get(process.env.REACT_APP_SERVER_URL + 'review/byuser', {
            params: { idUser: user.id }
        })
            .then((response) => {
                setReviews(response.data)
            })
            .catch((err) => {
                setError(err.message || 'An error occurred but no error message was received.')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [user])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }


    */

    const { user } = useUser()
    const [addMember, setAddMember] = useState({ idGroup: 0, idUser: 0, addMember: false })

    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('isMember');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setData(groups)
    }, [])

    useEffect(() => {
        const sortArray = type => {
            const types = {
                groupName: 'groupName',
                groupDescription: 'groupDescription',
                isMember: 'isMember',
                idGroup: 'idGroup',
            };
            const sortProperty = types[type];
            const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty] || a.idGroup - b.idGroup);
            setData(sorted);

        };
        if(sortType) {
        sortArray(sortType)
        console.log(sortType)
        }
    }, [sortType]);

    useEffect(() => {
        setSortType(null)
        setSortType('isMember')
    }, [data])

    useEffect(() => {
        const addMemberToGroup = () => {
            setLoading(true)
            axios.post(process.env.REACT_APP_SERVER_URL + 'groupmember/add', {
                groupId: addMember.idGroup,
                userId: addMember.idUser,
                role: 'member'
            })
                .then((response) => {
                    console.log(response.data)
                    setData(data.map((group) => {
                        if (group.idGroup === addMember.idGroup) {
                            return { ...group, isMember: true }
                        }
                        return group
                    }))
                })
                .catch((err) => {
                    console.log(err.message || 'An error occurred but no error message was received.')
                    setAddMember({ idGroup: 0, idUser: 0, addMember: false })
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        if (addMember.addMember) {
            addMemberToGroup()
            setAddMember({ idGroup: 0, idUser: 0, addMember: false })
            setSortType('isMember')
        }
    }, [addMember])




    //https://react-bootstrap.netlify.app/docs/components/list-group/
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Card>
            <Card.Header>AllGroups</Card.Header>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="groupName">groupName</option>
                <option value="groupDescription">groupDescription</option>
                <option value="isMember">isMember</option>
                <option value="idGroup">idGroup</option>
            </select>
            <ListGroup variant="flush">
                {data.map((group) => (
                    <ListGroup.Item key={group.idGroup}>
                        <Row>
                            {group.groupLogo && (
                                <Col md={4}>
                                    <img src={group.groupLogo} alt="Group Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                </Col>
                            )}
                            <Col md={group.groupLogo ? 6 : 9}>
                                <Row>
                                    <Col>
                                        <Card.Title>{group.groupName}</Card.Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>{group.groupDescription}</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>{group.idGroup}</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>{String(group.isMember)}</Card.Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={group.groupLogo ? 2 : 3}>
                                <Button onClick={() => setAddMember({ idGroup: group.idGroup, idUser: user.idUser, addMember: true })}>Join</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    )

}