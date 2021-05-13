export default class CommunityModel{
    constructor(parseCommunity){
        this.id = parseCommunity.id;
        this.name = parseCommunity.get("name");
        this.street = parseCommunity.get("street");
        this.city = parseCommunity.get("city");
        this.parseCommunity = parseCommunity;
    }
}