import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'

export default function NewMessageModal({show, onClose,onCreate, message, onUpdate}) {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, setPriority] = useState("Info");
    const [img, setImg] = useState(null);

    useEffect(() => {
        if(message){
            setTitle(message.title);
            setDetails(message.details);
            setPriority(message.priority);
            setImg(message.img);
        }
    }, [message])
    function handleFileChange(e){
        if (e.target.files.length === 1) {
            setImg(e.target.files[0]);
        } else {
            setImg(null);
        }
    }

    function onMessageClose(){
        clearForm();
        onClose();
    }
    function clearForm(){
        setTitle("");
        setDetails("");
        setPriority("");
        setImg(null);
    }
    function createMessage(){
        if(message){
            onUpdate(title,details,priority,img);
        } else{    
            onCreate(title,details,priority,img);
        }
        onMessageClose();
    }
    return (
        <Modal show={show} onHide={onMessageClose} className="c-new-tenant">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">{message ? "Update Message" :"New Message"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>   
                <Form className="c-message-form">
                    <Form.Group as={Row} >
                        <Form.Label column sm={4}>
                            Message Title
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>                        
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDetail">
                        <Form.Label column sm={4}>Details: </Form.Label>
                        <Col>
                            <Form.Control sm={8} as="textarea" placeholder="Details" rows={3} 
                                value={details} onChange={e => setDetails(e.target.value)} />
                        </Col>
                    </Form.Group>                    
                    <Form.Group as={Row} controlId="formBasicPriority">
                        <Form.Label column sm={4}>Priority: </Form.Label>
                        <Col  sm={8}>
                            <Form.Control as="select" placeholder="Priority" value={priority} onChange={e => setPriority(e.target.value)}>
                                <option>Info</option>
                                <option>Important</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>  
                    <Form.Group as={Row} controlId="formHorizontalImg">
                        <Form.Label column sm={4}>Message Image:</Form.Label>
                        <Col>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>                        
                        </Col>
                    </Form.Group>
                    <Image src={img ? typeof img === 'object' ? URL.createObjectURL(img) : img : "" }/>
                </Form>           
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onMessageClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createMessage}>
                    {message ? "Update Message" : "Create Message"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
