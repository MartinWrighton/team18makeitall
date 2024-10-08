import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import { useState } from 'react'
import { setCookie } from 'cookies-next';
import { createFalse } from 'typescript'

export default function Home() {
  const [userID, setuserID] = useState("")



  async function validateUser(userID: any) {
    const url = "/api/users?userID=" + userID;
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
        if ((data.data)) {
          // If the API is successfull
          setCookie('userID', userID);
          Router.push("./menu")
        } else {
          //if user was not found
          window.alert("User not found");
        }
      });
  }

  

  return (
    <>
      <Head>
        <title>Team 18</title>
        <meta name="description" content="Team 18 part 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className='w-screen h-screen pt-5 bg-gradient-to-bl from-red-300 to-blue-300 via-purple-300'>
        <div className='mx-auto p-5 bg-gradient-to-bl from-red-600 to-purple-500 via-red-500 shadow-xl rounded-xl w-1/3 h-fit'>
          <h1 className='text-center font-bold font-sans text-5xl'>Team 18 Part 3</h1>
        </div>
        <div className='mx-auto my-5 p-5 bg-gradient-to-bl from-red-500 to-blue-500 via-purple-500 shadow-xl rounded-xl w-8/12 h-5/6 space-y-5'>
          <h1 className='text-center font-bold font-sans text-3xl'>Log In</h1>
          <div className='w-fit mx-auto space-y-5'>
            <label>Name: </label>
            <input id="name"  placeholder='Name' className='justify-center border-2  rounded-md bg-gray-100' onInput={(e:any)=>{
              setuserID(e.target.value!)
            }
            }></input>
            <br/>
            <div className='w-fit mx-auto'>
             <button className='bg-gradient-to-b from-purple-500 to-purple-500 via-purple-600 hover:from-purple-400 hover:to-purple-400 hover:via-purple-500 hover:translate-y-1 p-5 rounded-lg h-fit  w-fit mx-auto font-bold font-sans text-xl' onClick={(e)=>{
              validateUser(userID)
             }}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
