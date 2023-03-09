import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from 'cookies-next'
import { userType } from '@/types/types'
import Link from "next/link";


export default function MessengerList(props: userType ){
    const [user,setUser] = useState<userType>(props);

   

      let style = "w-1/2 h-fit bg-blue-300 rounded-xl p-2 shadow-lg"


    return(
        <>  
        <Link className="my-2" href={"messenger?chatID="+user.userID}>
            <div className={style}>
                <div className="flex space-x-2">
                  <h1 className="font-bold">{user.userID}</h1>
                </div>
      
            </div>
          </Link>
        </>
    )
}