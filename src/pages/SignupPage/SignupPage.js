import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Col, Container, Row, Image } from 'react-bootstrap';
import BackendDataService from '../../utils/BackendDataService';
import ActiveUserContext from '../../shared/ActiveUserContext'
import './SignupPage.css';
import { Redirect } from 'react-router';

export default function SignupPage({onLogin}) {
    const [showSignupError, setShowSignupError] = useState(false);
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [img, setImg] = useState(null);
    const [community, setCommunity] = useState("");
    const [address, setAddress] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState("");
    const activeUser = useContext(ActiveUserContext);

    if (activeUser) {
        return <Redirect to="/"/>
    }

    async function signup(e) {
        e.preventDefault();
        let activeUser = null;
        if(fullName && email && pwd && community && address && city){ 
            setShowSignupError(false);
            try {
                activeUser = await BackendDataService.signup(fullName, email, pwd,community, address,apt, city, img);
                onLogin(activeUser);
                setShowInvalidLogin(false);
            } catch (error) {
                console.error('Error while logging in user', error);
                setShowInvalidLogin(true);
            }
        }
        else{
            setShowSignupError(true);
        }
    }

    function handleFileChange(e) {
        if (e.target.files.length === 1) {
            setImg(e.target.files[0]);
        } else {
            setImg(null);
        }
    }
    return (
        <div className="p-signup">

            <Container fluid className="p-signup-form col-md-7 col-sm-3">
                <h4>Create a Committee Member Account</h4>
                <p>Please fill in all the follwoing details:</p>
                {showSignupError ? <Alert variant="danger">Missing information! Fill in all details.</Alert> : null}
                {showInvalidLogin ? <Alert variant="danger">Error in Sign Up!</Alert> : null}
                <Form onSubmit={signup}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Enter name: </Form.Label>                       
                        <Form.Control type="text" value={fullName} 
                                    placeholder="Full Name" onChange={e => setFullName(e.target.value)}/>                        
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
                    <Row className="mb-3">
                        <Col sm={6}>
                                <Form.Label>Address: </Form.Label>
                                <Form.Control type="text" placeholder="Address"  value={address} onChange={e => setAddress(e.target.value)} />
                        </Col>
                        <Col  sm={6}>
                                <Form.Label>Apartment: </Form.Label>
                                <Form.Control type="number" placeholder="Apartment"  value={apt} onChange={e => setApt(e.target.value)} />
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City: </Form.Label>
                        <Form.Control type="text" placeholder="City"  value={city} onChange={e => setCity(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHorizontalImg">
                        <Form.Label>Tenant Image:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>                        
                    </Form.Group>
                    <Image src={img ? URL.createObjectURL(img) : ""}/> 
                    <Button className="mb-3" variant="success" type="submit" block>
                        Signup
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
