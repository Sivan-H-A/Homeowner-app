import React from 'react'
import { Accordion, Button, ButtonGroup, Card } from 'react-bootstrap'
import './TenantCardComponent.css'
export default function TenantsCardComponent({tenant, index , onUpdateTenant, onDeleteTenant}) {
//     const images=["https://image.shutterstock.com/image-vector/face-expression-woman-blond-hair-260nw-1253667445.jpg",
//     "https://image.shutterstock.com/image-vector/face-expression-woman-smiling-female-260nw-753503635.jpg",
//     "https://i.pinimg.com/736x/f8/2f/ba/f82fbac7514f944aacc0257445c1f89e.jpg",
//     "https://cdn2.vectorstock.com/i/1000x1000/50/61/cartoon-business-man-cartoon-character-young-male-vector-15325061.jpg",
//     "https://cdn3.vectorstock.com/i/1000x1000/16/07/young-and-successful-business-man-cartoon-employee-vector-15281607.jpg",
// ];
//     const item = Math.floor(Math.random() * images.length);
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
                        <Button onClick={()=>onDeleteTenant(index)} variant="danger">Delete</Button>
                    </ButtonGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

