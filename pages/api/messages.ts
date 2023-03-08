import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";



type messageType = {
    senderID: String;
    receiverID: String;
   
    content: String;
    timestamp: number;
  }

const messages = [
      {
        senderID: "Ben",
        receiverID: "Martin",
        content: "Terribly",
        timestamp: 202305011210,
    },
    {
        senderID: "Martin",
        receiverID: "Ben",
        content: "Hey hows it going?",
        timestamp: 202305011200,
    },
 
]

  

    export default function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method == "GET") {
        // Get the project to read
    
        // If the request contains an project ID -> return one project
        if (req.query.hasOwnProperty("userID")) {
          const { userID } = req.query;
          let messageList = []
          for (let i = 0; i < messages.length ; i++){
            if (messages[i].senderID == userID || messages[i].receiverID == userID ){
              messageList.push(messages[i])
            }
          }
          if (messageList) {
            return res.status(200).json({
              success: true,
              message: "ok",
              data: messageList,
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "message does not exist",
            });
          }
        } else {
          // Else return all projects
          return res.status(200).json({
            success: true,
            message: "ok",
            data: messages,
          });
        }
     
      }
    }