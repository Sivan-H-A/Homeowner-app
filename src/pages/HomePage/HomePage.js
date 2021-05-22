import React, { useContext, useState } from 'react';
import "./HomePage.css";
import image from '../../assets/background-image.jpg';
import LandingPageCardComponent from '../../components/LandingPageCardComponent/LandingPageCardComponent';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Link, Redirect } from 'react-router-dom';
import BackendDataService from '../../utils/BackendDataService';
import { IoIosLogIn } from 'react-icons/io';
export default function Homepage({onLogin}) {
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const activeUser = useContext(ActiveUserContext);

    // if (activeUser) {
    //     return <Redirect to="/dashboard"/>
    // }

    async function login(e) {
        e.preventDefault();
        let activeUser = null;
        try {
            activeUser = await BackendDataService.login(email,pwd);
            onLogin(activeUser);
        } catch (error) {
            console.error('Error while logging in user', error);
            setShowInvalidLogin(true);
        }
    }
    return (
        <Container fluid className="p-home">
            <div className="p-home-header">
                <div className={!activeUser? `p-home-title col-sm-6 col-md-8`: `p-home-title col-12`}>
                    <h1 className="display-4">Homeowner Association Management System</h1>
                    <h3>All you need to handle your building </h3>
                </div>
                {!activeUser ?
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
                                Login <IoIosLogIn/>
                            </Button>
                        </Form>
                    </div>
                :null }
            </div>
            <div className="p-home-bg-img">
                <img  className="p-home-img" src={image} alt="Landing page img"></img>
            </div>
            <div className="p-home-footer">
                <LandingPageCardComponent/>
            </div>
        </Container>
    )
}
