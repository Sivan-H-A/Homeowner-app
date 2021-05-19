export default class UserModel {
    #parseUser
    //role =1 community member role = 2 tenant
    constructor(parseUser){
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("username");
        this.role = parseUser.get("role");
        this.community = parseUser.get("community");
        this.apartment = parseUser.get("apartment");
        this.pwd = parseUser.password;
        this.#parseUser = parseUser;

    }
    static activeUser = null;
}
