import Parse from 'parse';
import CommunityModel from '../models/CommunityModel';
import UserModel from '../models/UserModel';
import image from '../assets/person.png';
import MessageModel from '../models/MessageModel';

async function login(email, pwd){
    if(email && pwd){
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
    }
    else{
        UserModel.activeUser = null;
        console.error("cannot login - missing credentials")
    }
    return UserModel.activeUser;
}
function loadActiveUser(){
    if(Parse.User.current()){
        UserModel.activeUser = new UserModel(Parse.User.current());
    }
    else{
        UserModel.activeUser =null;
    }
    return UserModel.activeUser;
}
async function signup(fullName, email, pwd, community, address, apt, city, img) {  
    const newCommunity = await addNewCommunity(community, address, city); 

    const user = new Parse.User()
    user.set('username', email);
    user.set('email', email);
    user.set('fullName', fullName);
    user.set('password', pwd);
    user.set('apartment',apt);
    if(img){
        user.set('image',new Parse.File(img.name,img));
    }
    else{
        user.set('image',{image});
    }
    user.set('role', 1)
    user.set('community', newCommunity.parseCommunity);

    try{
        const parseUser = await user.signUp();
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }
    catch(e){
        var query = new Parse.Query('Community');
        query.equalTo('objectId', newCommunity.parseCommunity.id);
        query.find().then(function(results) {
            return Parse.Object.destroyAll(results);
        });
        throw(e);
    }
}
async function addNewCommunity(community, address, city){
    const CommunityTable = Parse.Object.extend('Community');
    const newCommunity = new CommunityTable();
    newCommunity.set('name',community);
    newCommunity.set('street',address);
    newCommunity.set('city',city);
    const parseCommunity = await newCommunity.save();
    const communityItem = new CommunityModel(parseCommunity);
    return communityItem;
}
async function getAllCommunityTenants(community){
    var query = new Parse.Query('User');
    query.equalTo('community', community);
    const results = await query.find();
    const tenants = results.map(parseTenant => new UserModel(parseTenant));
    return tenants;
}
async function addTenant(fullName, email, pwd, community, apt, img){
    const user = new Parse.User()
    user.set('username', email);
    user.set('email', email);
    user.set('fullName', fullName);
    user.set('password', pwd);
    if(img){
        user.set('image',new Parse.File(img.name,img));
    }
    user.set('apartment',apt);
    user.set('role', 2)
    user.set('community', community);
    const acl = new Parse.ACL();
    acl.setPublicWriteAccess(true);
    acl.setPublicReadAccess(true);

    user.setACL(acl);

    const sessionToken = Parse.User.current().get("sessionToken");
    const parseUser = await user.signUp();
    Parse.User.become(sessionToken);
    return new UserModel(parseUser);
}
async function updateTenant(tenant,fullName,email,apt,img){ 
    const sessionToken = Parse.User.current().get("sessionToken");
    const query = new Parse.Query('User');
    const user = await query.get(tenant.id);
    user.set('username', email? email:tenant.email);
    user.set('email', email? email:tenant.email);
    user.set('fullName', fullName? fullName : tenant.fullName);
    user.set('apartment', apt? apt : tenant.apartment);
    if(typeof img === 'object'){
        user.set('image', new Parse.File(img.name,img));
    }
    const parseUser = await user.save();
    Parse.User.become(sessionToken);
    return new UserModel(parseUser); 
}
async function deleteTenant(tenant){
    const query = new Parse.Query('User');
    // Finds the user by its ID
    const user = await query.get(tenant.id); 
        // Invokes the "destroy" method to delete the user
    user.destroy().then((response) => {
        console.log('Deleted user', response);
        return new UserModel(response);
    }, (error) => {
        console.error('Error while deleting user', error);
        throw(error);
    });   
}
async function getAllCommunityMessages(community){
    const query = new Parse.Query('Message');
    query.equalTo('community', community);
    const results = await query.find();
    const messages = results.map(parseMessage => new MessageModel(parseMessage));
    return messages;
}
async function addNewMessage(title,details,priority,img){
    const Message = Parse.Object.extend('Message');
    const newMessage = new Message();
    
    newMessage.set('createdBy', Parse.User.current());
    newMessage.set('title', title);
    newMessage.set('details', details);
    newMessage.set('priority', priority);
    if(img){
        newMessage.set('image', new Parse.File(img.name, img));
    }
    newMessage.set('community', UserModel.activeUser.community);  
    newMessage.set('readBy',[Parse.User.current().id]);
  
    const parseMessage = await newMessage.save();

    return new MessageModel(parseMessage);
}
async function addNewComment(message,comment){
    const query = new Parse.Query('Message');
    const parseMessage = await query.get(message.id);
    let messageComments=[];
    // here you put the objectId that you want to update
    if(message.comments && message.comments.length>0){
        messageComments = messageComments.concat(message.comments);
        messageComments.push(comment);
        //add
    }else{
        messageComments.push(comment);
    }
    parseMessage.set("comments", messageComments);
    
    const newParseMessage = await parseMessage.save(); 

    return new MessageModel(newParseMessage);
}
async function updateMessage(message, title, details, priority, img){
    const query = new Parse.Query('Message');
    const parseMessage = await query.get(message.id);
    parseMessage.set('title', title);
    parseMessage.set('details', details);
    parseMessage.set('priority', priority);
    if(typeof img === 'object'){
        parseMessage.set('image', new Parse.File(img.name,img));
    }   
    const newParseMessage = await parseMessage.save();
    return new MessageModel(newParseMessage);
}
async function deleteMessage(message){
    const query = new Parse.Query('Message');
    // Finds the user by its ID
    const parseMessage = await query.get(message.id); 
        // Invokes the "destroy" method to delete the user
    parseMessage.destroy().then((response) => {
        console.log('Deleted user', response);
    }, (error) => {
        console.error('Error while deleting user', error);
        throw(error);
    });   
}
async function addUserReadMessage(message, userId){
    const query = new Parse.Query('Message');
    // Finds the user by its ID
    const parseMessage = await query.get(message.id);
    if(message && message.readBy){
        parseMessage.set('readBy', message.readBy.concat(userId));
    }else{
        parseMessage.set('readBy', [userId]);
    }   
    const newParseMessage = await parseMessage.save();
    return new MessageModel(newParseMessage);
}
export default  {login,signup, getAllCommunityTenants, 
                loadActiveUser, addTenant, 
                updateTenant, deleteTenant, 
                getAllCommunityMessages, addNewMessage,
                addNewComment,updateMessage,
                deleteMessage, addUserReadMessage } 