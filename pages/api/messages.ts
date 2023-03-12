import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

import { messageType } from '@/types/types'





  

    export default function handler(req: NextApiRequest, res: NextApiResponse) {
      let messages = [
        {
          senderID: "Martin",
          receiverID: "Luke",
          content: "At least 3",
          timestamp: 20230303133300,
         },
        {
            senderID: "Ben",
            receiverID: "Martin",
            content: "Terribly",
            timestamp: 20230301121000,
          },
        {
            senderID: "Martin",
            receiverID: "Ben",
            content: "Hey hows it going?",
            timestamp: 20230301120000,
          },
        {
            senderID: "Luke",
            receiverID: "Martin",
            content: "What is 8x8?",
            timestamp: 20230303125500,
          },
          {
            senderID: "Luke",
            receiverID: "Ben",
            content: "Hey Ben its Luke!",
            timestamp: 20230303125600,
          },
          {
            senderID: "Luke",
            receiverID: "GroupChat1",
            content: "Group chat time!",
            timestamp: 20230303125700,
          },
          {
            senderID: "Martin",
            receiverID: "GroupChat1",
            content: "It finaly works!",
            timestamp: 20230303125700,
          },
          {
            senderID: "Ben",
            receiverID: "GroupChat1",
            content: "Awesome",
            timestamp: 20230312233200,
          },
      ]



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
        messages.push(body.message)
        return res.status(200).json({
          success: true,
          message: "ok",
          data: messages,
        });
      }
    }