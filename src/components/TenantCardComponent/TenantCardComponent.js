import React from 'react'
import { Accordion, Button, ButtonGroup, Card } from 'react-bootstrap'
import './TenantCardComponent.css'
export default function TenantsCardComponent({tenant, index , onUpdateTenant, onDeleteTenant}) {
    return (
        <Card className="c-tenant">
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    <h5>{tenant.fullName}{tenant.role===1? ", Admin":null}</h5>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
                <div className="c-tenant-info">
                    <div className="c-tenant-img">
                        <Card.Img variant="top" src={tenant.img} />
                    </div>
                    <Card.Body>
                        <Card.Title>Name: {tenant.fullName}</Card.Title>
                        <Card.Text>Email: {tenant.email}</Card.Text>
                        <Card.Text>Apt: {tenant.apartment}</Card.Text>
                    </Card.Body>
                    <div className="c-tenant-button">
                        <ButtonGroup className="mr-2" aria-label="Basic example">
                            <Button onClick={()=>onUpdateTenant(index)}>Update</Button>
                            {tenant.role!==1 ? <Button onClick={()=>onDeleteTenant(index)} variant="danger">Delete</Button> :null}
                        </ButtonGroup>
                    </div>
                </div>
            </Accordion.Collapse>
        </Card>
    )
}

