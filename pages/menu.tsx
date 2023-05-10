import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import { useState } from 'react'
import { setCookie } from 'cookies-next';
import Link from 'next/link'

export default function Home() {









  return (
    <>
      <Head>
        <title>Team 18 | Menu</title>
        <meta name="description" content="Team 18 part 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Link className='absolute top-0 left-0' href="/">
      <button className='px-2 hover:bg-slate-500 text-white bg-black h-fit  w-fit mx-auto font-bold font-sans' style={{fontSize: '30px'}}> Log Out </button>
      </Link>
      <div className='w-screen h-screen pt-5 bg-gradient-to-b from-slate-100 to-slate-600 via-slate-400'>
        
        <div className='relative mx-auto my-5 p-5  shadow-xl rounded-xl w-8/12 h-5/6 space-y-5 border-2 border-white' style={{backgroundColor: 'rgb(140 150 160)'}}>
        <h1 className='text-center border-double border-b-2 border-black font-bold font-sans text-3xl' style={{paddingBottom: '20px'}} >Choose a subsystem</h1>
          <div className='w-fit mx-auto space-x-5 inline-grid grid-cols-2 gap-4'>
            <span>
            <Link href="messengerList" className="inline-block border-black border-2 rounded-xl overflow-hidden shadow-xl">
              <img  src="data:image/jpeg;base64,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" className="inline-block" style={{height: '50vh'}}/>
              
            </Link>
            <h1 className='text-3xl'>Messenger</h1>
            </span>
            <span >
            <Link href="analytics" className="inline-block border-white border-2 rounded-xl overflow-hidden">
                <img  src="https://www.analyticsinsight.net/wp-content/uploads/2021/01/Analytics-1024x622.jpeg" className="inline-block" style={{height: '50vh'}}/>
                
            </Link>
            <h1 className='text-3xl'>Analytics</h1>
            </span>
          </div>
          
        </div>
      </div>
    </>
  )
}
