import React, { useState } from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginComponent({login}) {
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [apt, setApt] = useState("");
    const [pwd, setPwd] = useState("");

    return (
        <div className="p-login col-md-3">
            <h4>Login to Your Building</h4>
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
    )
}
