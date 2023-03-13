type messageType = {
    messageID: number;
    senderID: string;
    receiverID: string;
    content: string;
    timestamp: number;
  }
type userType = {
    userID: string;
    completed: number;
    uncompleted: number;
    meaninglessStats: number[];
  }
type groupType = {
  groupID: string;
  members: string[];
}

    export type {userType,messageType,groupType}