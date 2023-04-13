import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

import { messageType } from '@/types/types'


/*USER IDS:
 Martin: 1
 Ben: 2
 Luke: 3
Timestamp is YYYYMMDD + HHMMSS i think

*/
let messages = [
  {
    messageID: 0,
    senderID: "Martin",
    receiverID: "Luke",
    content: "At least 3",
    timestamp: 20230303133300,
   },

  {
    messageID: 1,
      senderID: "Martin",
      receiverID: "Ben",
      content: "Hey hows it going?",
      timestamp: 20230301120000,
    },
  {
    messageID: 2, 
      senderID: "Luke",
      receiverID: "Martin",
      content: "What is 8x8?",
      timestamp: 20230303125500,
    },
    {
      messageID: 3,
      senderID: "Luke",
      receiverID: "Ben",
      content: "Hey Ben its Luke!",
      timestamp: 20230303125600,
    },
    {
      messageID: 4,
      senderID: "Ben",
      receiverID: "Martin",
      content: "Terribly",
      timestamp: 20230301121000,
      },
    {
      messageID: 5,
      senderID: "Luke",
      receiverID: "GroupChat1",
      content: "Group chat time!",
      timestamp: 20230303125700,
    },
    {
      messageID: 6,
      senderID: "Martin",
      receiverID: "GroupChat1",
      content: "It finaly works!",
      timestamp: 20230303125700,
    },
    {
      messageID: 7,
      senderID: "Ben",
      receiverID: "GroupChat1",
      content: "Awesome",
      timestamp: 20230312233200,
    },
]

console.log("<?php echo 'hello' ?>");
  

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

          //EDIT THIS TO SEPARATE PRIVATE MESSAGE FROM GROUP MESSAGE
        } else if (req.query.hasOwnProperty("groupID")) {//allowing groupchats
          const { groupID } = req.query;
          let messageList = []
          for (let i = 0; i < messages.length ; i++){
            if (messages[i].receiverID == groupID ){
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
          // Else return all projects - DISABLED
          return res.status(400).json({
            success: true,
            message: "ok",
            data: messages,
          });
        }
      
      } else if (req.method == "POST"){
        const body = req.body
        messages.push({
          messageID: messages.length,
          senderID: body.message.senderID,
          receiverID: body.message.receiverID,
          content: body.message.content,
          timestamp: body.message.timestamp
        })
        return res.status(200).json({
          success: true,
          message: "ok",
          data: messages,
        });
      }
    }