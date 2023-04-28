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
      <div className='w-screen h-screen pt-5 bg-gradient-to-bl from-red-300 to-yellow-300 via-orange-300'>
        <div className='mx-auto p-5 bg-gradient-to-bl from-red-600 to-yellow-600 via-orange-600 shadow-xl rounded-xl w-1/3 h-fit'>
          <h1 className='text-center font-bold font-sans text-5xl'>Menu</h1>
        </div>
        <div className='relative mx-auto my-5 p-5 bg-gradient-to-bl from-red-600 to-yellow-600 via-orange-600 shadow-xl rounded-xl w-8/12 h-5/6 space-y-5'>
          <h1 className='text-center font-bold font-sans text-3xl'>Choose an option:</h1>
          <div className='w-fit mx-auto space-x-5'>
            <Link href="messengerList">
                <button className='bg-gradient-to-b from-yellow-400 to-yellow-400 via-yellow-500 hover:from-yellow-300 hover:to-yellow-300 hover:via-yellow-400 hover:translate-y-1 p-5 rounded-lg h-fit  w-fit mx-auto font-bold font-sans text-xl'>Messenger</button>
            </Link>
            <Link href="analytics">
                <button className='bg-gradient-to-b from-yellow-400 to-yellow-400 via-yellow-500 hover:from-yellow-300 hover:to-yellow-300 hover:via-yellow-400 hover:translate-y-1 p-5 rounded-lg h-fit  w-fit mx-auto font-bold font-sans text-xl'>Data</button>
            </Link>

          </div>
          <Link className='absolute bottom-0 right-0' href="/">
                <button className='bg-gradient-to-b from-yellow-400 to-yellow-400 via-yellow-500 hover:from-yellow-300 hover:to-yellow-300 hover:via-yellow-400 hover:translate-y-1 px-2 rounded-lg h-fit  w-fit mx-auto font-bold font-sans text-xl'>Log Out</button>
          </Link>
        </div>
      </div>
    </>
  )
}
