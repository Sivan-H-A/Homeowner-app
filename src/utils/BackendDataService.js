import Parse from 'parse';
import CommunityModel from '../models/CommunityModel';
import UserModel from '../models/UserModel';
import image from '../assets/person.png';
async function login(email, pwd){
    const parseUser = await Parse.User.logIn(email, pwd);
    UserModel.activeUser = new UserModel(parseUser);
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
    var query1 = new Parse.Query('User');
    query1.equalTo('community', community);
    const results = await query1.find();
    const tenants = results.map(parseTenant => new UserModel(parseTenant));
    return tenants;
}
function loadActiveUser(){
    UserModel.activeUser = Parse.User.current()? new UserModel(Parse.User.current()):null;
    return UserModel.activeUser;
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
export default  {login,signup, getAllCommunityTenants, loadActiveUser, addTenant, updateTenant, deleteTenant } 