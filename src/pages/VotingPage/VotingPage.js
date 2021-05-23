import React, { useState, useContext, useEffect } from 'react';
import { Accordion, Button, Container, Spinner } from 'react-bootstrap';
import './VotingPage.css';
import ActiveUserContext from '../../shared/ActiveUserContext';
import BackendDataService from '../../utils/BackendDataService';
import { Redirect } from 'react-router';
import VotingCardComponent from '../../components/VotingCardComponent/VotingCardComponent';
import PageHeaderComponent from '../../components/PageHeaderComponent/PageHeaderComponent';
import NewVotingModal from '../../components/NewVotingModal/NewVotingModal';
import { Alert } from 'bootstrap';

export default function VotingPage() {
    const [votings,setVotings] = useState(null);
    const [communityUsers, setCommunityUsers] = useState(null);
    const [show, setShow] = useState(false);
    const [addingVotingError, setAddingVotingError] = useState(false);
    const [changeDateError, setChangeDateError] = useState(false);
    const [selectedVoting, setSelectedVoting] = useState("")
    const [buildingName, setBuildingName] =useState("");
    const activeUser = useContext(ActiveUserContext);
    useEffect(() => {
        async function getAllVoting(){
            const communityVoting = await BackendDataService.getAllCommunityVoting(activeUser.community);
            const users = await BackendDataService.getCommunityUsers(activeUser.community);
            const getBuildingName = await BackendDataService.getCommunityName(activeUser.community);
            setCommunityUsers(users);
            setVotings(communityVoting); 
            setBuildingName(getBuildingName) ;   
        }
        if(activeUser){
            getAllVoting()
        }
    }, [activeUser])

    if(!activeUser){
        return <Redirect to ="/"/>
    }

    let loading = true;
    let activeVotings =[];
    let notActiveVotings = [];
    let activeVotingsCards = [];
    let notActiveVotingsCards = [];
    if (votings && votings.length>0){
        activeVotings = votings.filter(voting=>voting.dueDate> new Date());
        if(activeVotings.length>0){
            activeVotingsCards = activeVotings.map((activeVoting,index) =>{
                return <VotingCardComponent voting={activeVoting} 
                                            index={index.toString()} 
                                            communityUsers={communityUsers}
                                            onUpdateDate={onUpdateDate}
                                            onUserVote={handleUserVote}/>
            })
        }
        notActiveVotings = votings.filter(voting=>voting.dueDate<=new Date());
        if(notActiveVotings.length>0){
            notActiveVotingsCards = notActiveVotings.map((notActiveVoting,index) =>{
                return <VotingCardComponent voting={notActiveVoting} 
                                            index={index.toString()} 
                                            communityUsers={communityUsers}
                                            disable={true}
                                            />
            })
        }
        loading = false;
    }else{
        loading=false;
    }
    function onClose(){
        setShow(false);
    }
    async function handleNewVoting(title, details,options,dueDate){
        try{
            const newVoting = await BackendDataService.addVoting(title, details,options,dueDate, activeUser);
            setVotings(votings.concat(newVoting));
            setAddingVotingError(false);
        }
        catch(e){
            console.log(e);
            setAddingVotingError(true);
        }
     
        setShow(false);
    }
    function onUpdateDate(index){
        const voting = activeVotings[index];
        setSelectedVoting(voting);
        setShow(true)
    }
    async function handleDateChange(date){
        if(date && typeof(date==="date")){
            try{
                const newVoting = await BackendDataService.changeVotingDate(selectedVoting, date);
                let index = votings.findIndex(x=>x.id===selectedVoting.id);
                let tempVotingArr = [];
                votings.splice(index,1,newVoting);
                tempVotingArr = tempVotingArr.concat(votings);
                setVotings(tempVotingArr);
                setChangeDateError(false);
            }catch(e){
                console.error(e);
                setChangeDateError(true);
            }
        }
        setShow(false)
        setSelectedVoting("");
    }
    async function handleUserVote(index, option){
        if(option){
            const voting = activeVotings[index];
            if(voting.votes && voting.votes.length>0){
                const userVote = voting.votes.find(x=>x.user.id===activeUser.id);
                if(userVote&& userVote.vote===option){
                    return;
                }
            }
            try{            
                const userVote ={
                    user: activeUser,
                    vote: option
                }
                const newVoting = await BackendDataService.addUserVoting(voting, userVote);
                let votingIndex = votings.findIndex(x=>x.id===voting.id);
                let tempVotingArr = [];
                votings.splice(votingIndex,1,newVoting);
                tempVotingArr = tempVotingArr.concat(votings);
                setVotings(tempVotingArr);    
            }catch(e){
                console.error(e);
            }
        }
    }

    return (
        <Container className="p-voting">
            <h2>Voting for building: {buildingName}</h2>
            <PageHeaderComponent action= {activeUser.role===1 ? "New Voting" :""}
                                showModal={()=>setShow(true)}/>
            {addingVotingError? <Alert variant="danger">Error in adding new voting. Please try again.</Alert>:null}                                
            {changeDateError? <Alert variant="danger">Error in changing the voting date. Please try again.</Alert>:null}
            {loading ? 
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    />
                    <span className="sr-only">Signing...</span>
                </Button>
                :
                <div className="p-voting-info">
                    {activeVotingsCards.length>0 ? 
                        <div style={{width:"50%"}}>
                            <h3>Active Voting</h3>
                            <Accordion>
                                {activeVotingsCards}
                            </Accordion>
                        </div>
                        :null}
                    {notActiveVotingsCards.length>0 ?   
                        <div>
                            <h3>Voting Results</h3>
                            <Accordion>
                                {notActiveVotingsCards}
                            </Accordion>
                        </div>
                        :null}
                </div>}
            
            <NewVotingModal show={show}
                            onClose={onClose}
                            onCreate={handleNewVoting}
                            voting={selectedVoting}
                            onUpdate={handleDateChange}/>
        </Container>
    )
}
