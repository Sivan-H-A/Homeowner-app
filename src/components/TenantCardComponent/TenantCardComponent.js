import React from 'react'
import { Accordion, Button, ButtonGroup, Card } from 'react-bootstrap'
import './TenantCardComponent.css'
export default function TenantsCardComponent({tenant, index , onUpdateTenant, onDeleteTenant}) {
    return (
        <Card className="c-tenant">
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    {/* <img src={images[item]}/> */}
                    {tenant.fname +" "+ tenant.lname} 
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
                <Card.Body>
                    <Card.Title>Name: {tenant.fname+" "+tenant.lname}</Card.Title>
                    <Card.Text>Email: {tenant.email}</Card.Text>
                    <Card.Text>Apt: {tenant.apartment}</Card.Text>
                    <ButtonGroup className="mr-2" aria-label="Basic example">
                        <Button onClick={()=>onUpdateTenant(index)}>Update</Button>
                        {tenant.role!==1 ? <Button onClick={()=>onDeleteTenant(index)} variant="danger">Delete</Button> :null}
                    </ButtonGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

