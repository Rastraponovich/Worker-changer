import { NextApiRequest, NextApiResponse } from "next"
import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"
import { getEmployeesByGuid } from "@/schemas/schema"

const getUserByGuid = async (guid: string | string[]) => {
    const schema = getEmployeesByGuid(guid)

    return await sendData(schema)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result = useParser(await getUserByGuid(req.query.guid))
    if (result?.RK7QueryResult) {
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]
        const {
            SourceCommand,
            RK7Reference,
            ...commandResult
        } = CommandResult[0]

        res.status(200).json({
            queryResult,
            commandResult,
            RK7Reference: RK7Reference[0],
            sourceCommand: SourceCommand[0],
        })
    } else {
        res.status(500)
    }
}
