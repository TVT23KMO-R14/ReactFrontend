import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'


export default function ListInvites({ invites }) {

    //https://react-bootstrap.netlify.app/docs/components/list-group/

    return (
        <Card>
            <Card.Header>Invites</Card.Header>
            <ListGroup variant="flush">
                {invites.map((invite) => (
                    <ListGroup.Item key={invite.idInvite}>
                        <Card.Text>{invite.groupName}</Card.Text>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    )
}
