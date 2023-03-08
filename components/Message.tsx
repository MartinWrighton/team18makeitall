import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from 'cookies-next'

type messageType = {
    senderID: string;
    receiverID: string;
    time: string;
    date: string;
    content: string;
  }

export default function Message(props : messageType){
    const [message,setMessage] = useState<messageType>(props);

    const userID = getCookie('userID')

      let style = "w-1/2 h-fit bg-blue-300 rounded-xl p-2 shadow-lg"

      if (userID==message.senderID){
        style = "w-1/2 h-fit bg-green-300 rounded-xl p-2 ml-[50%] shadow-lg"
    }

    return(
        <>
            <div className={style}>
                <div className="flex space-x-2">
                  <h1 className="font-bold">{message.senderID}</h1>
                  <p className="font-thin">{message.time}</p>
                  <p className="font-thin">{message.date}</p>
                </div>
                <p>{message.content}</p>
            </div>
        </>
    )
}