import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import MessengerList from '@/components/MessengerList'
import { getCookie } from 'cookies-next'
import { timeStamp } from 'console'
import { messageType,userType,groupType } from '@/types/types'
import Link from 'next/link'

export default function Home() {
  const [userID,setUserID] = useState("")

  const [users, setUsers] = useState<userType[]>([{
    userID: "",
    completed: 0,
    uncompleted:0,
    meaninglessStats: [0]
  }]);

  const [groups, setGroups] = useState<groupType[]>([{
    groupID: "",
    members: [],
  }]);

  //GET REQUEST
  
  async function getData(userID: any) {
    const url = "/api/users";
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
          //remove the user from their own list
          for (let i = 0 ; i < data.data.length;i++){
            if (data.data[i].userID == userID){
              data.data.splice(i, 1);
            }
          }
          setUsers(data.data);
        }
      });
  }

  async function getGroups(userID: any) {
    const url = "/api/groupchats";
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
          let chats = []
          for (let i = 0 ; i < data.data.length;i++){
            if (data.data[i].members.includes(userID)){//get only chats user is in
              chats.push(data.data[i])
            }
          }
          setGroups(chats);
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
   const userID = getCookie('userID')
   const ID = getCookie('userID')
   setUserID(ID as string)
   getData(ID);
   getGroups(ID);
  }, []);


  return (
    <>
      <Head>
        <title>Team 18 | Messenger</title>
        <meta name="description" content="Team 18 part 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className='w-screen h-screen pt-5 bg-gradient-to-bl from-blue-300 to-white via-cyan-300'>
        <div className='mx-auto p-5 bg-gradient-to-bl from-blue-600 to-cyan-500 via-cyan-600 shadow-xl rounded-xl w-1/3 h-fit'>
          <h1 className='text-center font-bold font-sans text-5xl'>Messenger</h1>
        </div>
        <div className='relative mx-auto my-5 p-5 bg-gradient-to-bl from-blue-600 to-white via-cyan-600 shadow-xl rounded-xl w-8/12 h-5/6 space-y-5'>
          <h1 className='text-center font-bold font-sans text-3xl'>Welcome {userID}</h1>
          <h1 className='text-center font-bold font-sans text-xl'>Direct:</h1>
          <>
              {users.map((user)=>(
                <div key={user.userID} className='pt-0.5 w-1/2 mx-auto'>
                <MessengerList key={user.userID} userID={user.userID} isGroup={false}/>
                </div>
              ))}
          </>
          <h1 className='text-center font-bold font-sans text-xl'>Groups:</h1>
          <>
              {groups.map((group)=>(
                <div key={group.groupID} className='pt-0.5 w-1/2 mx-auto'>
                <MessengerList key={group.groupID} userID={group.groupID} isGroup={true}/>
                </div>
              ))}
          </>
          <Link className='absolute bottom-0 right-0' href="/menu">
                <button className='bg-gradient-to-b from-cyan-500 to-cyan-500 via-cyan-600 hover:from-cyan-400 hover:to-cyan-400 hover:via-cyan-500 hover:translate-y-1 px-2 rounded-lg h-fit  w-fit mx-auto font-bold font-sans text-xl'>Back</button>
          </Link>
        </div>
      </div>
    </>
  )
}
