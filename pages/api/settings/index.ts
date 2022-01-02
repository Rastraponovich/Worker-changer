import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const result = await prisma.settings.findMany()
        res.send(result)
    }
    if (req.method === "POST") {
        const settings: any = req.body

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
