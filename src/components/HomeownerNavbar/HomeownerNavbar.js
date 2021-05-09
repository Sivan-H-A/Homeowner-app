import React, { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import ActiveUserContext from '../../shared/ActiveUserContext'
import './HomeownerNavbar.css'
export default function HomeownerNavbar({onLogout}) {
    const activeUser = useContext(ActiveUserContext);

    return (
        <Navbar bg="light" expand="lg" className= "c-homeowner-navbar">
            <Navbar.Brand href="#/">HOA System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    
                   
                </Nav>
                <Nav className="ml-auto c-homeowner-navbar-left">
                    {/* {!activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null}*/}
                    {!activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null}
                    {activeUser ? <Nav.Link href="#" onClick={() => onLogout()}>Logout</Nav.Link> : null}
                </Nav> 
            </Navbar.Collapse>
        </Navbar>
    )
}
