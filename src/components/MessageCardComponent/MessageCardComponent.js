import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, ButtonGroup, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import CommentModel from '../../models/CommentModel';
import './MessageCardComponent.css';
import { FaArrowCircleRight } from 'react-icons/fa';
import { IoIosMailOpen, IoIosMailUnread } from 'react-icons/io';
import ActiveUserContext from '../../shared/ActiveUserContext';

export default function MessageCardComponent({message, index, onUpdateMessage, onDeleteMessage, onNewCommentCreate, onReadMessage}) {
    const activeUser = useContext(ActiveUserContext);
    const [comment,setComment] = useState("");
    const [readBy, setReadBy] = useState(false);

    useEffect(() => {
        if(message && message.readBy){
            if(message.readBy.includes(activeUser.id)){
                setReadBy(true);
            }
        }
    }, [message])
    let commentsCards=[]
    if(message.comments && message.comments.length>0){      
        commentsCards = message.comments.map(comment=>{
            const commentTime = getTime(comment.time);
        
            return <Card className="c-comment">
                        <div>
                            <Card.Img variant="top" src={comment.user.img} />
                        </div>
                        <Card.Body>
                            <Card.Title>
                                {comment.user.fullName}:    
                                <Card.Text style={{display: "inline", fontSize: "1rem"}}>
                                {` ${commentTime}`}
                                </Card.Text>  
                            </Card.Title>
                            <Card.Text>{comment.text}</Card.Text>
                        </Card.Body>
                    </Card>
        })
    }
    function getTime(time){
        let date = ("0" + time.getDate()).slice(-2);
        // current month
        let month = ("0" + (time.getMonth() + 1)).slice(-2);
        // current year
        let year = time.getFullYear();
        // current hours
        let hours = time.getHours();
        // current minutes
        let minutes = ("0" + time.getMinutes()).slice(-2); 
        return month+"/"+date+"/"+year+" "+hours+":"+minutes
    }
    function handleNewComment(e){
        e.preventDefault();
        const newComment = new CommentModel(new Date(),comment,activeUser);
        onNewCommentCreate(newComment, index);
    }
    function handleReadMessage(){
        setReadBy(true);
        onReadMessage(index);
    }
    return (
        <Card className="c-message">
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={index} onClick={handleReadMessage}>
                    <Row>
                        <Col md={1}>
                            {readBy ? <IoIosMailOpen/>: <IoIosMailUnread/> }
                        </Col>
                        <Col>
                            <h5>{message.title}</h5>
                        </Col>
                    </Row>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
                <Row className="c-message-info">
                    {message.img ? 
                    <Col md={2} className="c-message-img">
                        <Card.Img variant="top" src={message.img} />
                    </Col>
                    :null}
                    <Col md={4}>
                        <Card.Body className="c-message-details">
                            <Card.Title>{message.title}</Card.Title>
                            <Card.Text>{message.details}</Card.Text>
                            <Card.Text>Priority: {message.priority}</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={4} className="c-message-comments"> 
                        <h5>Comments:</h5>                    
                        {commentsCards && commentsCards.length>0 ? commentsCards: null}
                        <Form  onSubmit={handleNewComment}>
                            <div className="c-comment-input">
                                <Form.Control placeholder="Comment" rows={2} 
                                        value={comment} onChange={e=>setComment(e.target.value)}/>
                                <Button className="c-comment-submit"onClick={handleNewComment}><FaArrowCircleRight/></Button>            
                            </div>
                        </Form>
                    </Col>
                    {activeUser.role===1 ?
                        <div className="c-message-button">
                            <ButtonGroup className="mr-2" aria-label="Basic example">
                                <Button onClick={()=>onUpdateMessage(index)}>Update</Button>
                                <Button onClick={()=>onDeleteMessage(index)} variant="danger">Delete</Button>
                            </ButtonGroup>
                        </div>
                    :null }
                </Row>
            </Accordion.Collapse>
        </Card>
    )
}
