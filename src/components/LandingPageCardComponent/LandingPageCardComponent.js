import React from 'react'
import { Card, CardDeck } from 'react-bootstrap'
import message from '../../assets/messages-icon.png';
import tenant from '../../assets/tenants-icon.png'
import votes from '../../assets/voting-icon.png'
import issues from '../../assets/issues-icon.png'

export default function LandingPageCardComponent() {
    return (
        <CardDeck>
           <Card className="col-md-6 col-lg-3">
                <Card.Img variant="top" src={tenant}/>
                <Card.Title>Managing building members</Card.Title>
                <Card.Text>You as a committee owner can add or remove tenants from the building account.</Card.Text>
            </Card>
            <Card className="col-md-6 col-lg-3">
                <Card.Img variant="top" src={message}/>
                <Card.Title>Manage messages system</Card.Title>
                <Card.Text>You as a committee owner can post messages to all building tenants. 
                    Also can delete/update posted message if needed. A tenant can view, filter and search messages.</Card.Text>
            </Card>
            <Card className="col-md-6 col-lg-3">
                <Card.Img variant="top" src={votes}/>
                <Card.Title>Manage voting system</Card.Title>
                <Card.Text>You as a committee owner can create a new voting, 
                    updating the information of the vote and observe the voting on-going progress. 
                    A building member can view all active voting and participate in desicion.</Card.Text>
            </Card>
            <Card className="col-md-6 col-lg-3">
                <Card.Img variant="top" src={issues}/>
                <Card.Title>Manage building issues</Card.Title>
                <Card.Text>You as a building member can report issues with priority, have the ability to view and update/delete/close the issue created by you.
                    As a committee member you can view all issues and comment then if needed.</Card.Text>
            </Card>

            
        </CardDeck>
    )
}
