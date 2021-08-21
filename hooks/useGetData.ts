import { PrismaClient } from "@prisma/client"
import axios from "axios"
import { Agent } from "https"

import { IAuth } from "interfaces/types"

const agent = new Agent({
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method",
})
export const sendData = async (xmlQuery: string): Promise<string | any> => {
    try {
        const prisma = new PrismaClient()
        const settings = await prisma.settings.findMany()

        const credentials: IAuth = {
            username: settings[0].login, //|| process.env.RK7_LOGIN,
            password: settings[0].password, //|| process.env.RK7_PASSWORD,
        }

        const URL = settings[0].url //|| process.env.RK7_URL
        const request = await axios.post(URL, xmlQuery, {
            httpsAgent: agent,
            auth: credentials,
            timeout: 3000,
            headers: {
                "Content-Type": "text/xml",
            },
        })
        return {
            error: false,
            data: request.data,
            isAxiosError: false,
            code: null,
        }
    } catch (error) {
        const { isAxiosError, code } = error
        return {
            error: true,
            isAxiosError,
            data: "",
            code: code || error.response.status || null,
        }
    }
}
