import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'


export default function ListUserInformation({ userInformation }) {

    //https://react-bootstrap.netlify.app/docs/components/list-group/

    return (
        <Card>
            <Card.Header>User Information</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Card.Text>{userInformation.firstName}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Card.Text>{userInformation.lastName}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Card.Text>{userInformation.userName}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Card.Text>{userInformation.email}</Card.Text>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )

}

