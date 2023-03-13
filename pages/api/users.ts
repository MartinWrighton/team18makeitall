import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";
import {userType } from '@/types/types'




const users = [
    {
        userID: "Martin",
        completed: 10,
        uncompleted: 12,
        meaninglessStats: [4,5,8,3]
    },
    {
      userID: "Ben",
      completed: 1,
      uncompleted: 23,
      meaninglessStats: [9,3,4,1]
  },
  {
    userID: "Luke",
    completed: 8,
    uncompleted: 4,
    meaninglessStats: [6,2,5,2]
},
{
  userID: "Jon",
  completed: 2,
  uncompleted: 4,
  meaninglessStats: [1,5,2,6]
},
{
  userID: "Isac",
  completed: 2,
  uncompleted: 34,
  meaninglessStats: [15,2,5,8]
},
]


    export default function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method == "GET") {
        // Get the project to read
    
        // If the request contains an project ID -> return one project
        if (req.query.hasOwnProperty("userID")) {
          const { userID } = req.query;

          const user = users.find(
            (user: userType) => String(user.userID) === userID
          );
          if (user) {
            return res.status(200).json({
              success: true,
              message: "ok",
              data: user,
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "user does not exist",
            });
          }
        } else {
          // Else return all projects
          return res.status(200).json({
            success: true,
            message: "ok",
            data: users,
          });
        }
     
      }
    }
    
