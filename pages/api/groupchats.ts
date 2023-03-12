import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";
import {groupType } from '@/types/types'




const groups = [
    {
        groupID: "GroupChat1",
        members: ["Martin","Luke","Ben"]
    },
    {
        groupID: "Unused Chat",
        members: []
    }

]


    export default function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method == "GET") {
        // Get the project to read
    
        // If the request contains an project ID -> return one project
        if (req.query.hasOwnProperty("groupID")) {
          const { groupID } = req.query;

          const group = groups.find(
            (group: groupType) => String(group.groupID) === groupID
          );
          if (group) {
            return res.status(200).json({
              success: true,
              message: "ok",
              data: group,
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "group does not exist",
            });
          }
        } else {
          // Else return all projects
          return res.status(200).json({
            success: true,
            message: "ok",
            data: groups,
          });
        }
     
      }
    }
    
