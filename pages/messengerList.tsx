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
import { messageType,userType } from '@/types/types'

export default function Home() {
  const [userID,setUserID] = useState("")

  const [users, setUsers] = useState<userType[]>([{
    userID: "",
    completed: 0,
    uncompleted:0,
    meaninglessStats: [0]
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
              {users.map((user)=>(
                <div className='pt-0.5 w-1/2 mx-auto'>
                <MessengerList key={user.userID} userID={user.userID} completed={user.completed} uncompleted={user.uncompleted} meaninglessStats={user.meaninglessStats}/>
                </div>
              ))}
          </>
        </div>
      </div>
    </>
  )
}
