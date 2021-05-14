import { NextApiRequest, NextApiResponse } from "next"
import { IAuth, IWorker } from "@/types/types"
import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"
import { setWorker } from "schemas/schema"

const handleSave = async (worker: IWorker) => {
    const schema = setWorker(worker)
    return await sendData(schema)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { worker } = req.body
    if (worker.GUIDString === "") {
        return res.status(200).json({ commandResult: { Status: "noChanges" } })
    }
    const result = useParser(await handleSave(worker))
    if (result?.RK7QueryResult) {
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]

        res.status(200).json({ queryResult, commandResult: CommandResult[0] })
    } else {
        res.status(500)
    }
}
