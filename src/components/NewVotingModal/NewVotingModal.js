import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { TiPlus } from 'react-icons/ti';

export default function NewVotingModal({show, onClose, onCreate ,voting, onUpdate}) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("")
    const [options, setOptions] = useState([]);
    const [dueDate, setDueDate] = useState(null);
    const [inputList, setInputList] = useState([{option:""}]);

    function onVotingClose(){
        clearForm();
        onClose();
    }
    function clearForm(){
        setTitle("");
        setDetails("");
        setOptions([]);
        setDueDate(null);
    }
    function handleInputChange(data,index){
        const list=[...inputList];
        list[index].option = data;
        setInputList(list);
        setOptions(list.map(x=>x.option));

    }
    function handleAddClick(){
        setInputList([...inputList, { option: ""}]);
    }
    function handleRemoveClick(index){
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }
    function createVoting(){    
        if(voting){
            onUpdate(new Date(dueDate));
        }else{
            onCreate(title, details, options, new Date(dueDate));
        }
        clearForm();
        onClose();
    }
    return (
        <Modal show={show} onHide={onVotingClose} className="c-new-voting">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">{voting ? "Update Voting" :"New Voting"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="c-voting-form">
                    { !voting ? 
                    <div>
                        <Form.Group as={Row} controlId="formBasicTitle">
                            <Form.Label column sm={3}>
                                Title
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>                        
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicDetails">
                            <Form.Label column sm={3}>Details </Form.Label>
                            <Col>
                                <Form.Control sm={9} as="textarea" placeholder="Details" 
                                    value={details} onChange={e => setDetails(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicOptions">
                                <Form.Label column sm={3}>Options: </Form.Label>
                                <Col  sm={9}>
                                    { inputList.map((x,i)=>{
                                        return(
                                            <div>
                                                <Form.Control name="option" value={x.option} 
                                                onChange={e=>handleInputChange(e.target.value,i)}/>
                                                {inputList.length !== 1 && <Button variant="outline-danger"  onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                                {inputList.length - 1 === i && <Button variant="outline-primary" onClick={handleAddClick}><TiPlus/>Add</Button>}
                                            </div>
                                        );
                                        })}                           
                                </Col>
                        </Form.Group>
                    </div> : null}
                    <Form.Group as={Row} controlId="formBasicEndDate">
                        <Form.Label column sm={4}>End Date: </Form.Label>
                        <Col sm={8}>
                            <Form.Control  type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onVotingClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createVoting}>
                    {voting ? "Update Voting" : "Create Voting"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
