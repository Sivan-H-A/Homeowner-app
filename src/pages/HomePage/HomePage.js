import React, { useContext, useState } from 'react';
import "./HomePage.css";
import image from '../../assets/background-image.jpg';
import LandingPageCardComponent from '../../components/LandingPageCardComponent/LandingPageCardComponent';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const activeUser = useContext(ActiveUserContext);

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
        <Container fluid className="p-home">
            <div className="p-home-header">
                <div className="p-home-title col-sm-6 col-md-8">
                    <h1 className="display-4">Homeowner Association Management System</h1>
                    <h3>All you need to handle your building </h3>
                </div>
                <div className="p-login col-md-3">
                    <h4>Login to Your Building</h4>
                    <p>or <Link to="/signup">create a new committee</Link></p>
                    {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
                    <Form onSubmit={login} className="mb-3">                      
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
                <LandingPageCardComponent/>
            </div>
        </Container>
    )
}
