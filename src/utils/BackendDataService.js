import Parse from 'parse';
import CommunityModel from '../models/CommunityModel';
import UserModel from '../models/UserModel';

async function login(email, pwd){
    const parseUser = await Parse.User.logIn(email, pwd);
    UserModel.activeUser = new UserModel(parseUser);
    return UserModel.activeUser;
}
async function signup(fname, lname, email, pwd, community, address, apt, city) {  
    const newCommunity = await addNewCommunity(community, address, city); 

    const user = new Parse.User()
    user.set('username', email);
    user.set('email', email);
    user.set('fname', fname);
    user.set('lname', lname);
    user.set('password', pwd);
    user.set('apartment',apt);
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
    var query2 = new Parse.Query('User');
    query1.equalTo('community', community);
    query2.notEqualTo('role', 1);
    const composeQuery = Parse.Query.and(query1, query2);
    const results = await composeQuery.find();
    const tenants = results.map(parseTenant => new UserModel(parseTenant));
    return tenants;
}
function loadActiveUser(){
    UserModel.activeUser = Parse.User.current()? new UserModel(Parse.User.current()):null;
    return UserModel.activeUser;
}
async function addTenant(fname, lname, email, pwd, community, apt){
    const user = new Parse.User()
    user.set('username', email);
    user.set('email', email);
    user.set('fname', fname);
    user.set('lname', lname);
    user.set('password', pwd);
    user.set('apartment',apt);
    user.set('role', 2)
    user.set('community', community);
    const acl = new Parse.ACL();
    acl.setPublicWriteAccess(true);
    acl.setPublicReadAccess(true);

    user.setACL(acl);

    const sessionToken = Parse.User.current().get("sessionToken");

    const parseUser = await user.signUp(null, {
        success: function (user) {
            Parse.User.become(sessionToken).then(function (user) {
            }, function (error) {
                alert('error');
            });
         },
            error: function (user, error) {console.error(error.message);}
    });
    return new UserModel(parseUser);
}
async function updateTenant(tenant,fname,lname,email,apt){ 
    const sessionToken = Parse.User.current().get("sessionToken");
    const query = new Parse.Query('User');
    const user = await query.get(tenant.id);
    user.set('username', email? email:tenant.email);
    user.set('email', email? email:tenant.email);
    user.set('fname', fname? fname : tenant.fname);
    user.set('lname', lname? lname : tenant.lname);
    user.set('apartment', apt? apt : tenant.apartment);
    const parseUser = await user.save();
    Parse.User.become(sessionToken);
    return new UserModel(parseUser); 
}
export default  {login,signup, getAllCommunityTenants, loadActiveUser, addTenant, updateTenant } 