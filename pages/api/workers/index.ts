import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "src/shared/hooks/usePareser"
import { sendData } from "src/shared/hooks/useGetData"
import { getEmployees } from "src/shared/schema"
import { IWorker } from "src/shared/lib/models"
import { ParsedGetWorkers } from "src/shared/lib/models/parsedTypes"
import NextCors from "nextjs-cors"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        allowedHeaders: "*",
    })
    const employeesSchema = getEmployees()

    const response = await sendData(employeesSchema)

    const parsedResponse: ParsedGetWorkers<IWorker> = useParser(response.data)

    if (!response.error) {
        const { CommandResult, ...status } = parsedResponse.RK7QueryResult
        const { SourceCommand, RK7Reference, ...commandResult } = CommandResult

        const workers: IWorker[] = RK7Reference.Items.Item.filter(
            (worker: IWorker) => worker.Status === "rsActive" && worker.genTaxPayerIdNum && worker.OfficialName
        )
        res.send({
            workers,
            commandResult,
            status,
            error: response.error,
            isAxiosError: response.isAxiosError,
        })
    } else {
        res.status(500).send({
            workers: [],
            commandResult: {},
            status: {},
            error: response.error,
            isAxiosError: response.isAxiosError,
        })
    }
}
