import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "lib/prisma"
import { TSettings } from "@/interfaces/settings"

export default async (
    req: { query: { [key: string]: string } } & NextApiRequest,
    res: NextApiResponse
) => {
    console.log(req.method)

    if (req.method === "GET") {
        const result = await prisma.settings.findUnique({
            where: { id: Number(req.query.id) },
        })
        return res.send(result)
    }
    if (req.method === "PATCH") {
        const settings: TSettings = req.body

        const result = await prisma.settings.update({
            data: {
                ...settings,
                mainParentIdent: Number(settings.mainParentIdent),
                port: Number(settings.port),
            },
            where: { id: Number(req.query.id) },
        })

        return res.send(result)
    }

    if (req.method === "DELETE") {
        const id = req.query.id

        const result = await prisma.settings.delete({
            where: { id: Number(id) },
        })

        return res.status(201).json(result)
    }
}
