export default class VotingModel{
    constructor(parseVoting){
        this.id = parseVoting.id;
        this.createdBy = parseVoting.get("createdBy");
        this.createDate = parseVoting.get("createdAt");
        this.title = parseVoting.get("title");
        this.details = parseVoting.get("details");
        this.options = parseVoting.get("options");
        this.dueDate = parseVoting.get("dueDate");
        this.votes = parseVoting.get("votes");
        this.community = parseVoting.get("community");
    }
}