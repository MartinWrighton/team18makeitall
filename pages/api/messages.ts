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
//change ip here to current external ip
var ip = "34.105.146.196";

function timeStampToDate(timestamp: String)
{
  let date = timestamp.substring(0,4) + "-" + timestamp.substring(4,6) +"-" + timestamp.substring(6,8);
  return date;
}
function timeStampToTime(timestamp:String)
{
  let time = timestamp.substring(8,10) + ":" +timestamp.substring(10,12) + ":" +timestamp.substring(12,14);
  return time;
}

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
  const response = await fetch("http://"+ip+"/backendTest/getMessages.php?mode=private");
  const data = await response.text();
  
  let JSONData =  JSON.parse(data);
  
  for(let i = 0; i < JSONData.length; i++)
  {
    let inputData = {userID: JSONData[i].receiverID}


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
  let largestID = JSONData.length;
  const groupResponse = await fetch("http://"+ip+"/backendTest/getMessages.php?mode=group");
  const groupData = await groupResponse.text();
  
  let groupJSONData =  JSON.parse(groupData);
  
  for(let i = 0; i < groupJSONData.length; i++)
  {
    let inputData = {userID: groupJSONData[i].receiverID}
    let timestamp = dateTimeToTimeStamp(groupJSONData[i].time, groupJSONData[i].date);
    let JSONString = '{"messageID": '+(String(Number(groupJSONData[i].groupMessageID) + largestID))+',\
    "senderID": "'+groupJSONData[i].forename+'",\
    "receiverID": "'+groupJSONData[i].Name+'",\
    "content": "'+groupJSONData[i].content+'",\
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
        //Called when sending messages
        const body = req.body;
        console.log(body.group);
        let senderID;
        const senderResponse = await fetch("http://"+ip+"/backendTest/getUser.php?name="+body.message.senderID);
        const senderResult = await senderResponse.text();
        
        senderID = await JSON.parse(senderResult)[0]["UserID"];
        //Separate here for saving group messages
        if(!body.group)
        {
          let recvID;
          const recvResponse = await fetch("http://"+ip+"/backendTest/getUser.php?name="+body.message.receiverID);
          const recvResult = await recvResponse.text();
          
          recvID = await JSON.parse(recvResult)[0]["UserID"];
          console.log("Result: ", recvID)        
          let date = timeStampToDate(body.message.timestamp.toString());
          let time = timeStampToTime(body.message.timestamp.toString());
          let data = {
            senderName: body.message.senderID,
            receiverName: body.message.receiverID,
            content: body.message.content,
            date: date,
            time: time,
            senderID: senderID,
            recvID: recvID
          }
          
          const insertQuery = await fetch("http://"+ip+"/backendTest/saveMessage.php?mode=private&sendName="+body.message.senderID+"\
          &recvName="+body.message.receiverID+"&content="+body.message.content+"&date="+date+"&time="+time+"&sendID="+senderID+"&\
          recvID="+recvID);
        }
        else
        {
          let recvID;
          console.log(body.message.receiverID);
          const recvResponse = await fetch("http://"+ip+"/backendTest/getGroup.php?name="+body.message.receiverID);
          const recvResult = await recvResponse.text();
          
          recvID = await JSON.parse(recvResult)[0]["GroupID"];
          console.log("Result: ", recvID)        
          let date = timeStampToDate(body.message.timestamp.toString());
          let time = timeStampToTime(body.message.timestamp.toString());
          let data = {
            recvID: recvID,
            senderID: senderID,
            content: body.message.content,
            date: date,
            time: time
          }
          console.log(data);
          const insertQuery = await fetch("http://"+ip+"/backendTest/saveMessage.php?mode=group&\
          &content="+body.message.content+"&date="+date+"&time="+time+"&sendID="+senderID+"&\
          recvID="+recvID);
        }
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