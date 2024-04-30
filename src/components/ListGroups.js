import React from 'react'
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import './ListGroups.css'
import { useNavigate } from 'react-router-dom'


export default function ListGroups({ groups }) {
  const navigate = useNavigate();

    //https://react-bootstrap.netlify.app/docs/components/list-group/
    //https://react-bootstrap.netlify.app/docs/components/cards/

    return (
        <Card>
            <Card.Header>Your Groups{console.log("ryhmät:", groups)}</Card.Header>
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