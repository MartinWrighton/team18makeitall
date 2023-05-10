import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import Message from '@/components/Message'
import { getCookie } from 'cookies-next'
import { timeStamp } from 'console'
import { messageType} from '@/types/types'
import Link from 'next/link'


export default function Home() {
  const [userID,setUserID] = useState("")
  const [chatID,setChatID] = useState("")
  const [textbox,setTextbox] = useState("")
  const [isGroupchat,setIsGroupchat] = useState(false)
  const [messages, setMessages] = useState<messageType[]>([{
    messageID: 0,
    senderID : "",
    receiverID: "",
    content: "",
    timestamp: 0
  }]);


  async function sendMessage(userID:string,chatID:string,textbox : string,isGroup:boolean){
    const url = "/api/messages"
    //date-time formatting
    let date = new Date();
    let month = date.getMonth()+1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    
    const longMonth = ("0"+String(month)).slice(-2)
    const longDay = ("0"+String(day)).slice(-2)
    const longHour = ("0"+String(hour)).slice(-2)
    const longMinute = ("0"+String(minute)).slice(-2)
    const longSecond = ("0"+String(second)).slice(-2)
    const datetime = parseInt(String(date.getFullYear())+longMonth+longDay+longHour+longMinute+longSecond)
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },body: JSON.stringify({
        message: {
        senderID: userID,
        receiverID: chatID,
        content: textbox,
        timestamp: datetime
        },
        group: isGroup,
        id: userID
    })
    })
    .then((res) => {
      return res.json()
    }
    )
    .then((data)=>{

      //display new message
      
      let messageList = []
          if (!isGroup){
          for (let i = 0 ; i < data.data.length ; i++){
            if (((data.data[i].senderID == userID)&&(data.data[i].receiverID == chatID))||((data.data[i].senderID == chatID)&&(data.data[i].receiverID == userID))){
              messageList.push(data.data[i])
          }
        }
          } else {
            for (let i = 0; i < data.data.length ; i++){
              if (data.data[i].receiverID == chatID ){
                messageList.push(data.data[i])
              }
            }
          }
          
          //sort messages
          messageList.sort(function(a: { timestamp: number }, b: { timestamp: number }){
            return a.timestamp - b.timestamp;
        });
        
          setMessages(messageList);
          
        
    })
  }

  //GET REQUEST
  async function getMessageData(userID: any,chatID: string,isGroup : boolean) {
    let url = "/api/messages?userID=" + userID;
    if (isGroup){//allowing groupchats
      url = "/api/messages?groupID=" + chatID;
    }
    await fetch(url, {
      method: "GET",
    })
      .then((res) => {
       
        if (!res.ok) {
          console.log("error fetching api data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          // If the API is successfull
          //filter for only the ones for this chat
          let messageList = []
          if (!isGroup){
          for (let i = 0 ; i < data.data.length ; i++){
            if (((data.data[i].senderID == userID)&&(data.data[i].receiverID == chatID))||((data.data[i].senderID == chatID)&&(data.data[i].receiverID == userID))){
              messageList.push(data.data[i])
          }
        }
          } else {
            messageList = data.data
          }
        
          //sort messages
          messageList.sort(function(a: { timestamp: number }, b: { timestamp: number }){
            return a.timestamp - b.timestamp;
        });
          setMessages(messageList);
        }
      });
  }
  

  useEffect(() => {
    /*old url based userID
    const params = new URLSearchParams(window.location.search);
    if (!params.has("userID")) {
      console.log("Missing user ID Parameter");
    } else {
    const userID = String(params.get("userID"));
    setUserID(params.get("userID")!)
    getMessageData(userID);
    }
    */
   //NEW cookie based userID
   const myID = getCookie('userID')
   setUserID(myID as string)
   
   const params = new URLSearchParams(window.location.search);
   let receiverID;
   let isGroup;
   //checking for groupchat
    if (params.has("chatID")){
      receiverID = String(params.get("chatID"));
      isGroup = false
      setIsGroupchat(false)
   } else {
    receiverID = String(params.get("groupID"));
    isGroup = true
    setIsGroupchat(true)
   }

   setChatID(receiverID as string)
   getMessageData(myID,receiverID,isGroup);
   
  }, []);



  return (
    <>
      <Head>
        <title>Team 18 | Messenger</title>
        <meta name="description" content="Team 18 part 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Link className='absolute top-0 left-0' href="/messengerList">
                <button className='px-2 hover:bg-slate-500 text-white bg-black h-fit  w-fit mx-auto font-bold font-sans' style={{fontSize: '30px'}}> ← </button>
      </Link>
      <div className='w-screen h-screen pt-5 bg-gradient-to-b from-slate-100 to-slate-600 via-slate-400'>
        
        <div className='relative mx-auto my-5 p-5  shadow-xl rounded-xl w-8/12 h-5/6 space-y-5 border-2 border-white' style={{backgroundColor: 'rgb(140 150 160)'}}>
          <h1 className='text-center border-double border-b-2 border-black font-bold font-sans text-3xl' style={{paddingBottom: '20px'}} >Messaging {chatID}</h1>
          <div className='h-[75%] overflow-y-auto space-y-1'>
             {messages.map((message)=>(
                <Message key={message.messageID} messageID={message.messageID} senderID={message.senderID} receiverID={message.receiverID} timestamp={message.timestamp} content={message.content}/>
              ))}
          </div>
          <div className='w-full mx-auto flex absolute bottom-10'>
            <div className='mx-auto w-[80%] flex'>
              <input id="message"  placeholder='Message' className='justify-center border-2 w-full rounded-l-md bg-gray-100' onInput={(e:any)=>{
                setTextbox(e.target.value!)
                
              }}
              onKeyDown = {(event:any) => {
                // If the user presses the "Enter" key on the keyboard
                if (event.key === "Enter") {
                  // Cancel the default action, if needed
                  event.preventDefault();
                  // Trigger the button element with a click
                  if (textbox){
                  sendMessage(userID,chatID,textbox,isGroupchat)
                  console.log(event.target.value!)
                  event.target.value! = ""
            
                  }
                }}
              }></input>
              <br/>
              <div className='w-fit mx-auto '>
              <button id="send" className='bg-black text-white hover:bg-slate-700  px-2 rounded-r-lg  w-fit mx-auto font-bold font-sans text-xl' onClick={(event)=>{
                if (textbox){
                  sendMessage(userID,chatID,textbox,isGroupchat)
                  let element = (document.getElementById("message")! as HTMLTextAreaElement)
                  element.value = ""
                }
              }}>Send</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}
