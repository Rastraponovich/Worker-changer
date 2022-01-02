import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"
import { getEmployees, getSystemInfo } from "@/schemas/schema"
import { IEmployeesData, IWorker } from "interfaces/types"
import { AxiosResponse } from "axios"
import { ParsedGetWorkers } from "@/interfaces/parsedTypes"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const employeesSchema = getEmployees()

    const response = await sendData(employeesSchema)

    const parsedResponse: ParsedGetWorkers<IWorker> = useParser(response.data)

    if (!response.error) {
        const { CommandResult, ...status } = parsedResponse.RK7QueryResult
        const { SourceCommand, RK7Reference, ...commandResult } = CommandResult

        const workers: IWorker[] = RK7Reference.Items.Item.filter(
            (worker: IWorker) =>
                worker.Status === "rsActive" &&
                worker.genTaxPayerIdNum &&
                worker.OfficialName
        )
        res.send({
            workers,
            commandResult,
            status,
            error: response.error,
            isAxiosError: response.isAxiosError,
        })
    } else {
        res.send({
            workers: [],
            commandResult: {},
            status: {},
            error: response.error,
            isAxiosError: response.isAxiosError,
        })
    }
}
