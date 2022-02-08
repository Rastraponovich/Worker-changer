import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "lib/prisma"
import { TSettings } from "@/interfaces/settings"
import NextCors from "nextjs-cors"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        allowedHeaders: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
    if (req.method === "GET") {
        const result = await prisma.settings.findMany()
        res.send(result)
    }
    if (req.method === "POST") {
        const settings: TSettings = req.body

        const result = await prisma.settings.create({ data: settings })

        res.send(result)
    }
}
