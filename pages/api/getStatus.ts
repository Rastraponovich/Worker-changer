import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"
import { getSystemInfo } from "@/schemas/schema"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await sendData(getSystemInfo())
    if (result.error) {
        return res.status(200).json({
            error: true,
            message: "Произошла ошибка",
            ...result,
        })
    } else {
        const data = useParser(result.data)

        const { CommandResult, ...queryResult } = data.RK7QueryResult[0]

        res.status(200).json({
            queryResult,
            commandResult: CommandResult[0],
        })
    }
}
