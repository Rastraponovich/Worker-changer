import { NextApiRequest, NextApiResponse } from "next"
import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"
import { getEmployeesByGuid } from "@/schemas/schema"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const EmployeesByIdSchema = getEmployeesByGuid(req.query.guid)
    const getUserByGuidResult = await sendData(EmployeesByIdSchema)

    const { data, error, isAxiosError, code } = getUserByGuidResult

    if (!error) {
        const result = useParser(data)
        const { CommandResult, ...queryResult } = result.RK7QueryResult
        const { RK7Reference } = CommandResult

        return res.status(200).json({
            queryResult,
            worker: RK7Reference.Items.Item[0],
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
