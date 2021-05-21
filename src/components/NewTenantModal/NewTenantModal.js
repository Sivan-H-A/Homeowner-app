import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import './NewTenantModal.css'
export default function NewTeneatModal({ show, onClose, onCreate , tenant, onUpdate}) {

    const [fullName, setFullName] = useState("" );
    const [email, setEmail] = useState("" );
    const [apt, setApt] = useState("" );
    const [pwd, setPwd] = useState("");
    const [img, setImg] = useState(null);
    useEffect(() => {
        if(tenant){
            setFullName(tenant.fullName);
            setEmail(tenant.email);
            setApt(tenant.apartment);
            setImg(tenant.img);
        }
        
    }, [tenant])

    function createTenant(){
        if(tenant){
            onUpdate(fullName,email,apt,img);
        }else{
            onCreate(fullName,email,apt, pwd,img);
        }
        clearForm();
        onClose();
    }

    function clearForm() {
        setFullName("");
        setEmail("");
        setApt("");
        setPwd("");
        setImg(null);
    }
    function onTenantClose(){
        clearForm();
        onClose();
    }
    function handleFileChange(e){
        if (e.target.files.length === 1) {
            setImg(e.target.files[0]);
        } else {
            setImg(null);
        }
    }

    return (
        <Modal show={show} onHide={onTenantClose} className="c-new-tenant">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">{tenant ? "Update Tenant" :"New Tenant"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="c-tenant-form">
                    <Form.Group as={Row} >
                        <Form.Label column sm={4}>
                            Full Name
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control value={fullName} placeholder="First name" onChange={e => setFullName(e.target.value)}/>                        
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicEmail">
                        <Form.Label column sm={4}>Email address: </Form.Label>
                        <Col>
                            <Form.Control sm={8} type="email" placeholder="Email" 
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    {!tenant ?
                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm={4}>Password: </Form.Label>
                            <Col  sm={8}>
                                <Form.Control type="password" placeholder="Password" 
                                    value={pwd} onChange={e => setPwd(e.target.value)} />
                            </Col>
                        </Form.Group>
                        :null
                    }
                    <Form.Group as={Row} controlId="formBasicApt">
                        <Form.Label column sm={4}>Apartment: </Form.Label>
                        <Col sm={8}>
                            <Form.Control  type="number" placeholder="Apartment"  value={apt} onChange={e => setApt(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalImg">
                        <Form.Label column sm={4}>Tenant Image:</Form.Label>
                        <Col>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>                        
                        </Col>
                    </Form.Group>
                    <Image src={img ? typeof img === 'object' ? URL.createObjectURL(img) : img : "" }/>
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
