import { NextApiRequest, NextApiResponse } from "next"
import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"
import { getEmployeesByGuid } from "@/schemas/schema"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    interface ISendDataResult {
        data: string
        error: boolean
        isAxiosError?: boolean
        code?: string
    }
    const EmployeesByIdSchema = getEmployeesByGuid(req.query.guid)
    const getUserByGuidResult: ISendDataResult = await sendData(
        EmployeesByIdSchema
    )

    const { data, error, isAxiosError, code } = getUserByGuidResult

    if (!error) {
        const result = useParser(data)
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]
        const {
            SourceCommand,
            RK7Reference,
            ...commandResult
        } = CommandResult[0]

        return res.status(200).json({
            queryResult,
            commandResult,
            RK7Reference: RK7Reference[0],
            sourceCommand: SourceCommand[0],
        })
    } else {
        return res.status(200).json({
            error: true,
            message: "произошла ошибка",
            isAxiosError,
            code,
        })
    }
}
