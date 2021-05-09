import React, { useState } from 'react';
import "./HomePage.css";
import image from '../../assets/background-image.jpg'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Homepage() {

    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [apt, setApt] = useState("");

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
                <div className="p-home-title col-6">
                    <h1 className="display-4">Homeowner Association Management System</h1>
                    <h3>All you need to handle your building </h3>
                </div>
                <div className="p-login col-3">
                    <h6>Login to Your Building</h6>
                    <p>or <Link to="/signup">create a new committee</Link></p>
                    {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
                    <Form onSubmit={login} className="mb-3">
                        <InputGroup className="mb-3">
                            <Form.Control value={fname} placeholder="First name" onChange={e => setfName(e.target.value)}/>
                            <Form.Control value={lname}placeholder="Last name" onChange={e => setlName(e.target.value)}/>
                        </InputGroup>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email address" 
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
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
        </div>
    )
}
