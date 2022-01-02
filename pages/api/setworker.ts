import { NextApiRequest, NextApiResponse } from "next"
import { IResponse } from "interfaces/types"
import { sendData } from "@/hooks/useGetData"
import { setWorker } from "schemas/schema"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { worker } = req.body
    const schema = setWorker(worker)
    const response: IResponse = await sendData(schema)

    if (!response.error) {
        return res.status(200).json({
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
