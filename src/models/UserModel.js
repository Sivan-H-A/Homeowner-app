import Parse from 'parse';

export default class UserModel {
    #parseUser
    //role =1 community member role = 2 tenant
    constructor(parseUser){
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.role = parseUser.get("role");
        this.communityId = parseUser.get("communityId");
        this.apartment = parseUser.get("apartment");
        this.pwd = parseUser.password;
        this.#parseUser = parseUser;

    }
    static activeUser = null;
}
    

//     static async login(email, pwd) {
//         const parseUser = await Parse.User.logIn(email, pwd);
//         UserModel.activeUser = new UserModel(parseUser);
//         return UserModel.activeUser;
//     }
//     static async signup(email, fname, lname, pwd) {
//         const user = new Parse.User()
//         user.set('username', email);
//         user.set('email', email);
//         user.set('fname', fname);
//         user.set('lname', lname);
//         user.set('password', pwd);

//         const parseUser = await user.signUp();
//         UserModel.activeUser = new UserModel(parseUser);
//         return UserModel.activeUser;
//     }
//     static logout() {
//         UserModel.activeUser = null;
//         Parse.User.logOut();
//     }
//     static loadActiveUser() {
//         UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
//         return UserModel.activeUser;
//     }
// }
