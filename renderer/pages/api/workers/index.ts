import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"
import { getEmployees, getSystemInfo } from "@/schemas/schema"
import { IEmployeesData, IWorker } from "@/types/types"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const employeesSchema = getEmployees()

    const request: IEmployeesData = await sendData(employeesSchema)

    if (!request.error) {
        const { CommandResult, ...status } = useParser(
            request.data
        ).RK7QueryResult[0]
        const {
            SourceCommand,
            RK7Reference,
            ...commandResult
        } = CommandResult[0]
        const workers: IWorker[] = RK7Reference[0].Items[0].Item.filter(
            (worker: IWorker) =>
                worker.Status === "rsActive" &&
                worker.genTaxPayerIdNum &&
                worker.OfficialName
        )
        res.send({
            workers,
            commandResult,
            status,
            error: request.error,
            isAxiosError: request.isAxiosError,
        })
    } else {
        res.send({
            workers: [],
            commandResult: {},
            status: {},
            error: request.error,
            isAxiosError: request.isAxiosError,
        })
    }
}
