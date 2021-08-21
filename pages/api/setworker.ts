import { NextApiRequest, NextApiResponse } from "next"
import { IAuth, IResponse, IWorker } from "interfaces/types"
import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"
import { setWorker } from "schemas/schema"
import { AxiosResponse } from "axios"

const handleSave = async (worker: IWorker) => {
    const schema = setWorker(worker)
    return await sendData(schema)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { worker } = req.body
    const schema = setWorker(worker)

    const request: IResponse = await sendData(schema)
    if (!request.error) {
        const result = useParser(request.data)
        const { CommandResult, ...queryResult } = result.RK7QueryResult[0]

        return res.status(200).json({
            queryResult,
            commandResult: CommandResult[0],
            error: false,
            message: `Сотрудник ${worker.Name} изменен`,
        })
    } else {
        return res.json({
            error: true,
            message: `Произошла ошибка, ${worker.Name} не изменен`,
        })
    }
}
