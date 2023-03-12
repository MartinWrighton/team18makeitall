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
            <div className="h-fit bg-blue-300 rounded-xl p-2 shadow-lg">
                <div className="flex space-x-2">
                  <h1 className="mx-auto font-bold text-center">{user}</h1>
                </div>
      
            </div>
          </Link>
        </>
    )
}