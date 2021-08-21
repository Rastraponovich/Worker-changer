import { ISettings } from "@/interfaces/mainStoreType"
import { NextApiRequest, NextApiResponse } from "next"
// import prisma from "lib/prisma"

import { PrismaClient } from "prisma/prisma-client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    if (req.method === "GET") {
        const result = await prisma.settings.findMany()
        res.send(result)
    }
    if (req.method === "POST") {
        const settings: ISettings = req.body

        const result = await prisma.settings.update({
            data: {
                ...settings,
                mainParentIdent: Number(settings.mainParentIdent),
            },
            where: { id: settings.id },
        })

        res.send(result)
    }
}
