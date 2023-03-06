import { useState } from "react";
import { useEffect } from "react";
type messageType = {
    senderID: string;
    receiverID: string;
    time: string;
    date: string;
    content: string;
  }

export default function Message(props : messageType){
    const [userID,setUserID] = useState("")
    const [message,setMessage] = useState<messageType>(props);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has("userID")) {
          console.log("Missing user ID Parameter");
        } else {
        setUserID(String(params.get("userID")))
        }
      }, []);

      let style = "w-1/2 h-fit bg-blue-300 rounded-xl p-2"

      if (userID==message.senderID){
        style = "w-1/2 h-fit bg-green-300 rounded-xl p-2 ml-[50%]"
    }

    return(
        <>
            <div className={style}>
                <h1 className="font-bold">{message.senderID}</h1>
                <p>{message.content}</p>
            </div>
        </>
    )
}