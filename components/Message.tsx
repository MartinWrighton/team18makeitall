import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from 'cookies-next'

type messageType = {
    senderID: string;
    receiverID: string;
    content: string;
    timestamp: number;
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
                  <p className="font-thin">{String(message.timestamp).slice(-4,-2)+":"+String(message.timestamp).slice(-2)}</p>
                  <p className="font-thin">{String(message.timestamp).slice(6,8)+"-"+String(message.timestamp).slice(4,6)+"-"+String(message.timestamp).slice(0,4)}</p>
                </div>
                <p>{message.content}</p>
            </div>
        </>
    )
}