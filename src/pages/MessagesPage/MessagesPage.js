import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Alert, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import DeleteModalComponent from '../../components/DeleteModalComponent/DeleteModalComponent';
import MessageCardComponent from '../../components/MessageCardComponent/MessageCardComponent';
import NewMessageModal from '../../components/NewMessageModal/NewMessageModal';
import PageHeaderComponent from '../../components/PageHeaderComponent/PageHeaderComponent';
import CommunityModel from '../../models/CommunityModel';
import ActiveUserContext from '../../shared/ActiveUserContext';
import BackendDataService from '../../utils/BackendDataService';
import './MessagesPage.css';

export default function MessagesPage() {
    const activeUser = useContext(ActiveUserContext)
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [addingMessageError, setAddingMessageError] = useState(false)
    const [newCommentError, setNewCommentError] = useState(false);
    const [updateMessageError , setUpdateMessageError] = useState(false);
    const [deleteMessageError , setDeletMessageError] = useState(false);
    const [messages, setMessages] = useState(null);
    const [filterText,setFilterText] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        async function getAllMessages(){  
            const communityMessages = await BackendDataService.getAllCommunityMessages(activeUser.community);
            setMessages(communityMessages);     
        }   
        if (activeUser){
            getAllMessages();
           
        }
    }, [activeUser]);

    if(!activeUser){
        return <Redirect to ="/"/>
    }

    const filterSelection= ["filter by priority:","Info","Important"]
    const sortBySelection=["Date","Priority"];
    const community = new CommunityModel(activeUser.community); 
    let filteredMessages=[];
    let MessageCards=[];
    if(messages && messages.length>0)
    {
        filteredMessages = filteredMessages.concat(messages);

        if(filterText){
            filteredMessages = filteredMessages.filter(message=> {
                return  message.title.includes(filterText) ||
                        message.details.includes(filterText);
            });
        }
        if(filterPriority && filterPriority!=="filter by priority:"){
            filteredMessages = filteredMessages.filter(message=>message.priority===filterPriority)
        }
        if(sortBy){
            filteredMessages.sort(function(a,b){
                switch (sortBy){
                    case "Date":
                        return b.creatDate>a.createDate;
                    case "Priority":
                        return a.priority > b.priority;
                    default:
                        return -1;
                }
            })
        }
        MessageCards = filteredMessages.map((message, index) =>{
            return <MessageCardComponent key={index} message={message} 
                                        index={index.toString()} 
                                        activeUser = {activeUser}
                                        onUpdateMessage={onUpdateMessage} 
                                        onDeleteMessage={onDeleteMessage} 
                                        onNewCommentCreate={handleNewComment}
                                        onReadMessage={handleReadMessage}/>           
        });
    }

    function onClose(){
        setShow(false);
        setShowDelete(false);
    }
    function onUpdateMessage(index){
        const currentMessage = filteredMessages[index];
        setSelectedMessage(currentMessage);
        setShow(true)
    }
    function onDeleteMessage(index){
        const currentMessage = filteredMessages[index];
        setSelectedMessage(currentMessage);
        setShowDelete(true)

    }
    async function handleNewMessage(title,details,priority,img){
        try{
            const newMessage = await BackendDataService.addNewMessage(title,details,priority,img);
            setMessages(messages.concat(newMessage));
            setAddingMessageError(false);
        } catch(e){
            console.error(e);
            setAddingMessageError(true);
        }
        setShow(false);
    }
    async function handleNewComment(comment, index){
        try{
            const currentMessage = filteredMessages[index];
            const newMessage = await BackendDataService.addNewComment(currentMessage, comment);
            const messageIndex = messages.findIndex(x=>x.id === currentMessage.id);
            let tempMessageArr = [];
            messages.splice(messageIndex,1, newMessage);
            tempMessageArr = tempMessageArr.concat(messages);
            setMessages(tempMessageArr);
            setNewCommentError(false);
        }catch(error){
            console.error(error);
            setNewCommentError(true);
        }
    }
    async function handleUpdateMessage(title,details,priority,img){
        if(title!==selectedMessage.title || 
            details!==selectedMessage.details || 
            priority!==selectedMessage.priority || 
            img!==selectedMessage.img){
            try{     
                const newMessage = await BackendDataService.updateMessage(selectedMessage, title,details,priority,img);
                const messageIndex = messages.findIndex(x=>x.id === selectedMessage.id);
                let tempMessageArr = [];
                messages.splice(messageIndex,1, newMessage);
                tempMessageArr = tempMessageArr.concat(messages);
                setMessages(tempMessageArr);
                setUpdateMessageError(false);
            }              
            catch(e){
                console.log(e);
                setUpdateMessageError(true);
            }
        }
        setShow(false);
        setSelectedMessage("");
    }
    async function handleDeleteMessage(){
        try{
            BackendDataService.deleteMessage(selectedMessage);
            const tempArr = messages.filter(message=>message.id!==selectedMessage.id);
            setMessages(tempArr);
            setDeletMessageError(false);
        }
        catch(e){
            console.log(e);
            setDeletMessageError(true);
        }
        setShowDelete(false)
        setSelectedMessage("");
    }
    async function handleReadMessage(index){
        const currentMessage = filteredMessages[index];
        const newMessage = await BackendDataService.addUserReadMessage(currentMessage, activeUser.id);
        const messageIndex = messages.findIndex(x=>x.id === currentMessage.id);
        let tempMessageArr = [];
        messages.splice(messageIndex,1, newMessage);
        tempMessageArr = tempMessageArr.concat(messages);
        setMessages(tempMessageArr);
    }
    return (
        <Container>
            <h2 className="p-message-header">Messages for building: {community? community.name:""}  </h2>
            <PageHeaderComponent placeholder="Filter by Text in Title or Details"
                                filterSelection={filterSelection}
                                sortBy={sortBySelection} 
                                onSortChange={(data)=>setSortBy(data)}
                                onFilterChange={(data)=>setFilterText(data)}
                                onFilterSelectChange={(data)=> setFilterPriority(data)}
                                action= {activeUser.role===1 ? "New Message" :""}
                                showModal={()=>setShow(true)}/>
            {addingMessageError? <Alert variant="danger">Error in adding new Message. Please try again.</Alert> : null}
            {newCommentError? <Alert variant="danger">Error in adding new comment. Please try again.</Alert> : null}
            {updateMessageError? <Alert variant="danger">Error in updating the selected message. Please try again.</Alert> :null}
            {deleteMessageError? <Alert variant="danger">Error in deleting the selected message. Please try again.</Alert> :null}
            <Accordion>
                {MessageCards && MessageCards.length>0 ? MessageCards :null }
            </Accordion>
            <NewMessageModal show={show}
                            onClose={onClose}
                            onCreate={handleNewMessage}
                            message={selectedMessage}
                            onUpdate={handleUpdateMessage}/>
            <DeleteModalComponent show={showDelete}
                                onClose={onClose}
                                title="Message"
                                name={selectedMessage? selectedMessage.title:null}
                                onDelete={handleDeleteMessage}/>
        </Container>
    )
}
