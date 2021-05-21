import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import ActiveUserContext from '../../shared/ActiveUserContext'
import './HomeownerNavbar.css'
import { BsBuilding } from 'react-icons/bs';
import { GiHand } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'
import { SiGooglemessages } from 'react-icons/si'

export default function HomeownerNavbar({onLogout}) {
    const activeUser = useContext(ActiveUserContext);

    return (
        <Container>
            <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" className= "c-homeowner-navbar">
                <Navbar.Brand href="#/"><BsBuilding /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {activeUser && activeUser.role === 1? <Nav.Link href="#/tenants">Tenants<IoIosPeople /></Nav.Link> : null}
                        {activeUser ? <Nav.Link href="#/messages">Messages<SiGooglemessages/></Nav.Link> : null}
                        {/* community member */}
                    </Nav>
                    <Nav className="ml-auto">
                        {/* {!activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null} */}
                        {!activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null}
                        {activeUser ? <Nav.Link eventKey="disabled" disabled>Welcome<GiHand /> 
                            {activeUser.fullName? activeUser.fullName.split(" ")[0]:""}</Nav.Link> :null}
                        {activeUser ? <Nav.Link href="#" onClick={() => onLogout()}>Logout</Nav.Link> : null}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>    
        </Container>
    )
}
