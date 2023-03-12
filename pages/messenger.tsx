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
  const [messages, setMessages] = useState<messageType[]>([{
    senderID : "",
    receiverID: "",
    content: "",
    timestamp: 0
  }]);


  function sendMessage(textbox : string){
    console.log(textbox)
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
          console.log(data.data)
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
   } else {
    receiverID = String(params.get("groupID"));
    isGroup = true
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
      <div className='w-screen h-screen pt-5 bg-gradient-to-bl from-indigo-300 to-amber-300 via-indigo-300'>
        <div className='mx-auto p-5 bg-gradient-to-bl from-indigo-900 to-indigo-500 via-indigo-600 shadow-xl rounded-xl w-1/3 h-fit'>
          <h1 className='text-center font-bold font-sans text-5xl'>Messenger</h1>
        </div>
        <div className='relative mx-auto my-5 p-5 bg-gradient-to-bl from-indigo-900 to-yellow-300 via-indigo-500 shadow-xl rounded-xl w-8/12 h-5/6 space-y-5'>
          <h1 className='text-center font-bold font-sans text-3xl'>Messaging {chatID}</h1>
          <>
             {messages.map((message)=>(
                <Message key={message.timestamp+message.senderID} senderID={message.senderID} receiverID={message.receiverID} timestamp={message.timestamp} content={message.content}/>
              ))}
          </>
          <div className='w-full mx-auto flex absolute bottom-20'>
            <div className='mx-auto w-[80%] flex'>
              <input id="name"  placeholder='Message' className='justify-center border-2 w-full rounded-md bg-gray-100' onInput={(e:any)=>{
                setTextbox(e.target.value!)
              }
              }></input>
              <br/>
              <div className='w-fit mx-auto '>
              <button className='bg-gradient-to-b from-indigo-400 to-indigo-400 via-indigo-500 hover:from-indigo-300 hover:to-indigo-300 hover:via-indigo-400 hover:translate-y-1 px-2 rounded-lg  w-fit mx-auto font-bold font-sans text-xl' onClick={(e)=>{
                sendMessage(textbox)
              }}>Send</button>
              </div>
            </div>
          </div>
          <Link className='absolute bottom-0 right-0' href="/messengerList">
                <button className='bg-gradient-to-b from-indigo-400 to-indigo-400 via-indigo-500 hover:from-indigo-300 hover:to-indigo-300 hover:via-indigo-400 hover:translate-y-1 px-2 rounded-lg h-fit  w-fit mx-auto font-bold font-sans text-xl'>Back</button>
          </Link>
        </div>
      </div>
    </>
  )
}
