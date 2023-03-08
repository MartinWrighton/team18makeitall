import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import Message from '@/components/Message'
import { getCookie } from 'cookies-next'

type messageType = {
  senderID: string;
  receiverID: string;
  time: string;
  date: string;
  content: string;
}

export default function Home() {
  const [userID,setUserID] = useState("")
  const [messages, setMessages] = useState<messageType[]>([{
    senderID : "",
    receiverID: "",
    time: "",
    date: "",
    content: ""
  }]);


  //GET REQUEST
  
  async function getMessageData(userID: any) {
    const url = "/api/messages?userID=" + userID;
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
          setMessages(data.data);
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
   const ID = getCookie('userID')
   setUserID(ID as string)
   getMessageData(ID);
  }, []);



  return (
    <>
      <Head>
        <title>Team 18 | Messenger</title>
        <meta name="description" content="Team 18 part 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className='w-screen h-screen pt-5 bg-blue-200'>
        <div className='mx-auto p-5 bg-white shadow-xl rounded-xl w-1/3 h-fit'>
          <h1 className='text-center font-bold font-sans text-5xl'>Messenger</h1>
        </div>
        <div className='mx-auto my-5 p-5 bg-white shadow-xl rounded-xl w-8/12 h-5/6 space-y-5'>
          <h1 className='text-center font-bold font-sans text-3xl'>Welcome {userID}</h1>
          <>
             {messages.map((message)=>(
                <Message key={message.time+message.senderID} senderID={message.senderID} receiverID={message.receiverID} time={message.time} date={message.date} content={message.content}/>
              ))}
          </>
        </div>
      </div>
    </>
  )
}
