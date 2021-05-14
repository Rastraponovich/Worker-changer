import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"
import { getSystemInfo } from "schemas/schema"

const getStatus = async () => {
    const schema = getSystemInfo()

    return await sendData(schema)
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
