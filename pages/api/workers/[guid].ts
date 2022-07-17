import { NextApiRequest, NextApiResponse } from "next"
import { sendData } from "src/shared/hooks/useGetData"
import { useParser } from "src/shared/hooks/usePareser"
import { getEmployeesByGuid } from "src/shared/schema"
import NextCors from "nextjs-cors"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        allowedHeaders: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
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
