import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "lib/prisma"
<<<<<<< HEAD
=======
import { TSettings } from "@/interfaces/settings"
>>>>>>> settings

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const result = await prisma.settings.findMany()
        res.send(result)
    }
    if (req.method === "POST") {
<<<<<<< HEAD
        const settings: any = req.body

        const result = await prisma.settings.update({
            data: {
                ...settings,
                mainParentIdent: Number(settings.mainParentIdent),
            },
            where: { id: settings.id },
        })
=======
        const settings: TSettings = req.body

        const result = await prisma.settings.create({ data: settings })
>>>>>>> settings

        res.send(result)
    }
}
