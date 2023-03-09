type messageType = {
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

    export type {userType,messageType}