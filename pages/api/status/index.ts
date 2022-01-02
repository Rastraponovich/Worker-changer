import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"
import { getSystemInfo } from "@/schemas/schema"
import { ParsedSystemInfo } from "@/interfaces/parsedTypes"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const schema = getSystemInfo()

    const response = await sendData(schema)

    if (response.error) {
        return res.status(200).json({
            error: true,
            message: "Произошла ошибка",
            Status: "Произошла ошибка",
            ...response,
        })
    } else {
        const parsedResponse: ParsedSystemInfo = useParser(response.data)

        res.status(200).json({
            error: false,
            message: "",
            ...parsedResponse.RK7QueryResult,
        })
    }
}
