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
export default  {login,signup} 