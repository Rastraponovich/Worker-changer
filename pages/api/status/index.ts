import { NextApiRequest, NextApiResponse } from "next"

import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"
import { getSystemInfo } from "@/schemas/schema"
import { ParsedSystemInfo } from "@/interfaces/parsedTypes"
import NextCors from "nextjs-cors"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        allowedHeaders: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
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
