export default class MessageModel{
    constructor(parseMessage){
        this.id = parseMessage.id;
        this.title = parseMessage.get("title");
        this.details = parseMessage.get("details");
        this.priority = parseMessage.get("priority");
        this.community = parseMessage.get("community");
        if(parseMessage.get("comments")){
            this.comments = parseMessage.get("comments");     
        }
        this.createdBy = parseMessage.get("createdBy");
        if(parseMessage.get("image")){
            this.img = parseMessage.get("image").url();
        }
        this.createDate = parseMessage.get("createdAt");
        this.readBy = parseMessage.get("readBy");
    }

}

