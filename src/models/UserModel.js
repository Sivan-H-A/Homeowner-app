export default class UserModel {
    #parseUser
    //role =1 community member role = 2 tenant
    constructor(parseUser){
        this.id = parseUser.id;
        this.fullName = parseUser.get("fullName");
        this.userName = parseUser.get("username");
        this.email = parseUser.get("username");
        this.role = parseUser.get("role");
        this.community = parseUser.get("community");
        this.apartment = parseUser.get("apartment");
        this.pwd = parseUser.password;
        if(parseUser.get("image")){
            this.img = parseUser.get("image").url();
        }
        this.#parseUser = parseUser;

    }
    static activeUser = null;
}
