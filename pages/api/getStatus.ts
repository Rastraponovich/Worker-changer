import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "../../hooks/usePareser"
import { sendData } from "../../hooks/useGetData"

const getStatus = async () => {
    const xmlQuery = `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="GetSystemInfo" />
     
  </RK7Query>`
    return await sendData(xmlQuery)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result = useParser(await getStatus())
    if (result?.RK7QueryResult) {
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]

        res.status(200).json({ queryResult, commandResult: CommandResult[0] })
    } else {
        res.status(500)
    }
}
