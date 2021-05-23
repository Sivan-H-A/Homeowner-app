import React, { useContext, useState } from 'react'
import { Accordion, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Pie } from 'react-chartjs-2';
import './VotingCardComponent.css';
import BackendDataService from '../../utils/BackendDataService';

export default function VotingCardComponent({voting, index, communityUsers,onUpdateDate, onUserVote, disable }) {
    const activeUser = useContext(ActiveUserContext);
    const [optionChose, setOptionChose] = useState("");

    const bgColor = ['rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',    
    'rgba(255, 206, 86, 0.2)',    
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',];
    const bColor = ['rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',];                      
     let votingDueDate = getTime(voting.dueDate);
     let optionsList=[];
     let optionsRadio="";
     let userVoting="";
     let data = null;
    function getTime(time){
        let date = ("0" + time.getDate()).slice(-2);
        // current month
        let month = ("0" + (time.getMonth() + 1)).slice(-2);
        // current year
        let year = time.getFullYear();
        return month+"/"+date+"/"+year;
    }
    if(voting.votes&& voting.votes.length>0){
        for (const voteOption of voting.options){
            if(voting.votes&& voting.votes.length>0){
                const optionVotes = voting.votes.filter(x=>x.vote===voteOption);
                optionsList= [...optionsList,{"option": voteOption, count: optionVotes.length}];
            }
        }
        const userVote = voting.votes.find(x=>x.user.id===activeUser.id)
        if(userVote){
            userVoting= userVote.vote; 
        }
        const tempadd = optionsList.map(x=>x.count);
        const voterCount = tempadd.reduce((a, b) => a+b);
        if (communityUsers.length - voterCount > 0){
            optionsList = [...optionsList, {option:"not voted yet", count: (communityUsers.length - voterCount)}];
        }
        data = {
            labels: optionsList.map(x=>x.option),
            datasets: [
                {
                    label: '# of Votes',
                    data: optionsList.map(x=>x.count),
                    backgroundColor: bgColor.slice(0,optionsList.length),
                    borderColor: bColor.slice(0,optionsList.length),
                    borderWidth: 1,
                },
            ],
        };
    }
    
    if(voting.votes && voting.votes.length>0 ){
             
    }
    
    optionsRadio = voting.options.map(option=>{
        return <Form.Check name="option"
        type="radio" 
        label={option}
        value={option} 
        onChange={(e)=>setOptionChose(e.target.value)}/> 
    })
    
    function onVoteChose(){
        onUserVote(index, optionChose);
    }
    return (
        <Card className="c-voting">
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    <h5>{voting.title}</h5>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
                <div className="p-voting-info">
                    <Card.Body className="p-voting-card">      
                        <Row>                    
                            <Col md={2}>
                                <h6>Details:</h6>
                            </Col>
                            <Col md={7}>
                                <Card.Text>{voting.details}</Card.Text>
                            </Col>                     
                        </Row>                         
                        <Row>
                            <Col md={2}>
                                <h6>Options:</h6>
                            </Col>                               
                            <Col md={4}>
                                <Form>
                                    {optionsRadio}
                                </Form>
                            </Col>
                            <Col md={4}>
                                {!disable ? <Button onClick={onVoteChose}>Vote</Button>:null}
                                { userVoting? <Card.Text>You Chose: {userVoting}</Card.Text>:null}
                            </Col>
                            
                        </Row>                       
                        <Row>
                            <Col md={2}>
                                <h6>End Date:</h6>
                            </Col>
                            <Col md={4}>
                                <Card.Text>{votingDueDate}</Card.Text>
                            </Col>
                            <Col md={4}>
                                {activeUser.role===1 && !disable ? <Button onClick={()=>onUpdateDate(index)}>Update End Date</Button>:null}
                            </Col>
                        </Row> 
                        
                        {data ? <Col md={6}>
                                    <Pie data={data} /> 
                                </Col> 
                        :null}
                    </Card.Body>
                </div>
                    
            </Accordion.Collapse>
        </Card>      
    )
}
