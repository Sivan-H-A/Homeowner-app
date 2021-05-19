import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import './NewTenantModal.css'
export default function NewTeneatModal({ show, onClose, onCreate , tenant, onUpdate}) {

    const [fname, setFname] = useState("" );
    const [lname, setLname] = useState("" );
    const [email, setEmail] = useState("" );
    const [apt, setApt] = useState("" );
    const [pwd, setPwd] = useState("");
    useEffect(() => {
        if(tenant){
            setFname(tenant.fname);
            setLname(tenant.lname);
            setEmail(tenant.email);
            setApt(tenant.apartment);
        }
        
    }, [tenant])

    function createTenant(){
        if(tenant){
            onUpdate(fname,lname,email,apt);
        }else{
            onCreate(fname,lname,email,apt, pwd);
        }
        clearForm();
        onClose();
    }

    function clearForm() {
        setFname("");
        setLname("");
        setEmail("");
        setApt("");
        setPwd("");
    }
    function onTenantClose(){
        clearForm();
        onClose();
    }

    return (
        <Modal show={show} onHide={onTenantClose} className="c-new-tenant">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">{tenant ? "Update Tenant" :"New Tenant"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>
                            Tenant Name
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control className="mb-3" value={fname} placeholder="First name" onChange={e => setFname(e.target.value)}/>                        
                            <Form.Control className="mb-3" value={lname} placeholder="Last name" onChange={e => setLname(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm={3}>Email address: </Form.Label>
                        <Col>
                            <Form.Control sm={9} type="email" placeholder="Email" 
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    {!tenant ?
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={3}>Password: </Form.Label>
                            <Col  sm={9}>
                                <Form.Control type="password" placeholder="Password" 
                                    value={pwd} onChange={e => setPwd(e.target.value)} />
                            </Col>
                        </Form.Group>
                        :null
                    }
                    <Form.Group as={Row} className="mb-3" controlId="formBasicApt">
                        <Form.Label column sm={3}>Apartment: </Form.Label>
                        <Col sm={9}>
                            <Form.Control  type="number" placeholder="Apartment"  value={apt} onChange={e => setApt(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onTenantClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createTenant}>
                    {tenant ? "Update Tenant" : "Create Tenant"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
