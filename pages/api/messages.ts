import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

import { messageType } from '@/types/types'
import fetch from 'node-fetch';

/*USER IDS:
 Martin: 1
 Ben: 2
 Luke: 3
Timestamp is YYYYMMDD + HHMMSS i think

*/
/*
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
]*/
/*
fetch("http://34.89.92.41/backendTest/getMessages.php")
.then(result => result.json()).then(data=>{
  console.log(data[0])

  
});
*/

function dateTimeToTimeStamp(rawtime: String, rawdate: String)
{
  let date = rawdate.split("-");
  let time = rawtime.split(":");
  return date[0] + date[1] + date[2] + time[0] + time[1] + time[2];
}
let messages: any[] = []
async function getMessages()
{
  messages = [];
  const response = await fetch("http://34.89.92.41/backendTest/getMessages.php");
  const data = await response.text();
  
  let JSONData =  JSON.parse(data);
  
  for(let i = 0; i < JSONData.length; i++)
  {
    let inputData = {userID: JSONData[i].receiverID}
    /*const userResponse = await fetch("http://34.89.92.41/backendTest/getUser.php",{method: 'POST', body: JSON.stringify(inputData)});
    const receiverName = await userResponse.text();*/

    let timestamp = dateTimeToTimeStamp(JSONData[i].time, JSONData[i].date);
    let JSONString = '{"messageID": '+JSONData[i].messageID+',\
    "senderID": "'+JSONData[i].forename+'",\
    "receiverID": "'+JSONData[i].receiverName+'",\
    "content": "'+JSONData[i].content+'",\
    "timestamp": '+timestamp+'\
  }';
  JSONString = await JSON.parse(JSONString);
    messages.push(JSONString)
  }
  return messages;
}

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      

      await getMessages();
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