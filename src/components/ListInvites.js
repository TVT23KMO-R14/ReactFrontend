import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import AcceptInviteRequestButton from './AcceptInviteRequestButton'


export default function ListInvites({ invites }) {

    //https://react-bootstrap.netlify.app/docs/components/list-group/

    return (
        <>
        <Card>
            <Card.Header>Invites</Card.Header>
            <ListGroup variant="flush">
                {invites.map((invite) => (
                    <ListGroup.Item key={invite.idGroupInvite}>
                        <Card.Text>Ryhmän numero: {invite.group_idGroup}</Card.Text>
                        <Card.Text>Kutsuttava: {invite.inviteUserId}</Card.Text>
                        <Card.Text>Kutsuteksti: {invite.inviteText}</Card.Text>
                        <Card.Text>Kutsun id: {invite.idGroupInvite}</Card.Text>
                        <AcceptInviteRequestButton invite={invite} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
        </>
    )
}
