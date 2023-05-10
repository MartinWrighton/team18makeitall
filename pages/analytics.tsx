import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import React from 'react';
import Chart from 'chart.js/auto';
import { ArcElement } from 'chart.js';
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next'
import {Line, Pie} from 'react-chartjs-2';
import { userType } from '@/types/types'
import Link from 'next/link'
Chart.register(ArcElement);



export default function Home() {
  const [userID,setUserID] = useState("")
  const [user, setUser] = useState<userType>({
    userID: "",
    completed: 0,
    uncompleted:0,
    meaninglessStats: [0]
  });



  //GET REQUEST
  
  async function getData(userID: any) {
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
        if (data.success) {
          // If the API is successfull
          setUser(data.data);
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

  //add data to pie
 
  let dataPie = {
    labels: ["Complete","Incomplete"],
    datasets: [{
      data: [user.completed,user.uncompleted],
      backgroundColor: [
            '#00ff7f',
            '#ff4040',

      ],
      hoverBackgroundColor: [
        '#00ff7f',
        '#ff4040',
        
      ]
    }]
  };

  let dataLine = {
    labels: ["Jan","Feb","Mar","Apr"],
    datasets: [{
      label:"Workspeed",
      data: user.meaninglessStats,
      backgroundColor: [
            '#00ff7f',
            '#ff4040',

      ],
      hoverBackgroundColor: [
        '#00ff7f',
        '#ff4040',
        
      ]
    }]
  };


  return (
    <>
      <Head>
        <title>Team 18 | Analytics</title>
        <meta name="description" content="Team 18 part 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className='w-screen  pt-5 bg-gradient-to-b from-slate-100 to-slate-600 via-slate-400' style={{height: '100vh'}}>
      <Link className='absolute top-0 left-0' href="/menu">
        <button className='px-2 hover:bg-slate-500 text-white bg-black h-fit  w-fit mx-auto font-bold font-sans' style={{fontSize: '30px'}}> ← </button>
      </Link>
        <div className='relative mx-auto my-5 p-5 border-white border-2 shadow-xl rounded-3xl  w-8/12 space-y-5 ' style={{backgroundColor: 'rgb(170 190 215)'}}>
          <h1 className='text-center font-bold font-sans text-3xl'>Welcome {userID}</h1>
          <div className='flex'>
            <div className='w-1/2'>
              <Pie style={{width:'50%', height:'50%'}}
                        data={dataPie}
                        width={300}
                        height={300}
                        options={{
                            

                            plugins: {
                              legend: {

                                position: 'left'
                              }
                              
                            },
                            

                        }}
              />
            </div>
            <div className='w-1/2'>
              <Line style={{width:'300px', height:'300px'}}
                  data={dataLine}
                  width={300}
                  height={300}
              />
            </div>
          </div>
          
        </div>
        
      </div>
    </>
  )
}
