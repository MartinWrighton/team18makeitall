import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from 'cookies-next'
import { userType } from '@/types/types'
import Link from "next/link";


export default function MessengerList(props:any ){
    const [user,setUser] = useState(props.userID);

   

      let url = "messenger?chatID="+user
      if (props.isGroup){
        url = "messenger?groupID="+user
      }


    return(
        <>  
        <Link className="my-2" href={url}>
            <div className="h-fit bg-gradient-to-bl from-cyan-400 to-cyan-400 via-cyan-500 hover:from-cyan-300 hover:to-cyan-300 hover:via-cyan-400 hover:translate-y-1 rounded-xl p-2 shadow-lg">
                <div className="flex space-x-2">
                  <h1 className="mx-auto font-bold text-center">{user}</h1>
                </div>
      
            </div>
          </Link>
        </>
    )
}