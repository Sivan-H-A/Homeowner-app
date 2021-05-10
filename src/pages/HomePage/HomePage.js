import React, { useState } from 'react';
import "./HomePage.css";
import image from '../../assets/background-image.jpg';
import message from '../../assets/messages-icon.png';
import tenant from '../../assets/tenants-icon.png'
import votes from '../../assets/voting-icon.png'
import issues from '../../assets/issues-icon.png'

import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Homepage() {

    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [apt, setApt] = useState("");
    const [pwd, setPwd] = useState("");

    async function login(e) {
        e.preventDefault();

        // try {
        //     const activeUser = await UserModel.login(email, pwd);
        //     onLogin(activeUser);
        // } catch (error) {
        //     console.error('Error while logging in user', error);
        //     setShowInvalidLogin(true);
        // }
    }

    return (
        <div className="p-home">
            <div className="p-home-header">
                <div className="p-home-title col-8">
                    <h1 className="display-4">Homeowner Association Management System</h1>
                    <h3>All you need to handle your building </h3>
                </div>
                <div className="p-login col-3">
                    <h6>Login to Your Building</h6>
                    <p>or <Link to="/signup">create a new committee</Link></p>
                    {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
                    <Form onSubmit={login} className="mb-3">
                        <InputGroup className="mb-3">
                            <Form.Control value={fname} placeholder="First name" onChange={e => setFname(e.target.value)}/>
                            <Form.Control value={lname}placeholder="Last name" onChange={e => setLname(e.target.value)}/>
                        </InputGroup>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email address" 
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" 
                                value={pwd} onChange={e => setPwd(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAppartment">
                            <Form.Control type="text" placeholder="Enter appartment" 
                                value={apt} onChange={e => setApt(e.target.value)} />
                        </Form.Group>
                        <Button  className="mb-3" variant="primary" type="submit" block>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="p-home-bg-img">
                <img  className="p-home-img" src={image}></img>
            </div>
            <div className="p-home-footer">
                <Card className="p-home-card col-md-3 col-sm-6">
                    <img src={tenant}/>
                    <h5>Managing building members</h5>
                    <p>You as a committee owner can add or remove tenants from the building account. </p>
                </Card>
                <Card className="p-home-card col-md-3 col-sm-6">
                    <img src={message}/>
                    <h5>Manage messages system</h5>
                    <p>You as a committee owner can post messages to all building tenants. 
                        Also can delete/update posted message if needed. A tenant can view, filter and search messages.
                    </p>
                </Card>
                <Card className="p-home-card col-md-3 col-sm-6">
                    <img src={votes}/>
                    <h5>Manage voting system</h5>
                    <p>You as a committee owner can create a new voting, 
                        updating the information of the vote and observe the voting on-going progress. 
                        A building member can view all active voting and participate in desicion.</p>
                </Card>
                <Card className="p-home-card col-md-3 col-sm-6">
                    <img src={issues}/>
                    <h5>Manage building issues</h5>
                    <p>You as a building member can report issues with priority, have the ability to view and update/delete/close the issue created by you.
                        As a committee member you can view all issues and comment then if needed.</p>
                </Card>
            </div>
        </div>
    )
}
