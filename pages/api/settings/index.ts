import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "lib/prisma"
import { TSettings } from "@/interfaces/settings"

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
