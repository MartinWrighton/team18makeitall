import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";



type userType = {
  userID: string;
  completed: number;
  uncompleted: number;
  meaninglessStats: number[];
}

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
    
