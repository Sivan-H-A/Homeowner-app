import React, { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import ActiveUserContext from '../../shared/ActiveUserContext'
import './HomeownerNavbar.css'

export default function HomeownerNavbar({onLogout}) {
    const activeUser = useContext(ActiveUserContext);

    return (
        <Navbar fixed="top" bg="light" expand="lg" className= "c-homeowner-navbar">
        <Navbar.Brand href="#/">HOA System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {activeUser ? <Nav.Link href="#">Messages</Nav.Link> : null}
            </Nav>
            <Nav className="ms-auto">
                {/* {!activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null} */}
                {!activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null}
                {activeUser ? <Nav.Link href="#" onClick={() => onLogout()}>Logout</Nav.Link> : null}
            </Nav>
        </Navbar.Collapse>
        </Navbar>    
    )
}
