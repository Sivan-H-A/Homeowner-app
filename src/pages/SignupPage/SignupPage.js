import React, { useState } from 'react'
import { Alert, Button, Form, InputGroup, Col, Container, Row } from 'react-bootstrap'
import './SignupPage.css'

export default function SignupPage({onLogin}) {
    const [showSignupError, setShowSignupError] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [community, setCommunity] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");


    async function signup(e) {
        e.preventDefault();
        // try {
        //     const activeUser = await UserModel.login(email, pwd);
        //     onLogin(activeUser);
        // } catch (error) {
        //     console.error('Error while logging in user', error);
        //     // setShowInvalidLogin(true);
        // }
    }
    return (
        <div className="p-signup">

            <Container fluid className="p-signup-form col-md-7 col-sm-3">
                <h4>Create a Committee Member Account</h4>
                <p>Please fill in all the follwoing details:</p>
                {showSignupError ? <Alert variant="danger">Error in Sign Up!</Alert> : null}
                <Form onSubmit={signup}>
                    <Form.Group className="mb-3" controlId="formBasicFname">
                        <Form.Label>Enter name: </Form.Label>                       
                            <Form.Control className="mb-3" value={fname} placeholder="First name" onChange={e => setFname(e.target.value)}/>                        
                            <Form.Control className="mb-3" value={lname} placeholder="Last name" onChange={e => setLname(e.target.value)}/>
                        </Form.Group>              
                
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address: </Form.Label>
                        <Form.Control type="email" placeholder="Email" 
                            value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                            value={pwd} onChange={e => setPwd(e.target.value)} />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicBuilding">
                        <Form.Label>Building/Conmmunity Name</Form.Label>
                        <Form.Control type="text" value={community} onChange={e => setCommunity(e.target.value)} />
                    </Form.Group> 
                
                    <Form.Group className="mb-3" controlId="formBasicBuilding">
                        <Form.Label>Address: </Form.Label>
                        <Form.Control type="text" placeholder="Address"  value={address} onChange={e => setAddress(e.target.value)} />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicBuilding">
                        <Form.Label>City: </Form.Label>
                        <Form.Control type="text" placeholder="City"  value={city} onChange={e => setCity(e.target.value)} />
                    </Form.Group>
        

                    <Button className="mb-3" variant="success" type="submit" block>
                        Signup
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
