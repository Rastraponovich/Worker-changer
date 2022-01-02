import { PrismaClient } from "@prisma/client"
import { AxiosResponse } from "axios"
import { IAuth } from "interfaces/types"
import { externalAPI } from "lib/api"

type CustomAPIResponse = {
    error: boolean
    data: string
    isAxiosError: boolean
    code: null | number
}

export const sendData = async (
    xmlQuery: string
): Promise<CustomAPIResponse> => {
    try {
        // const prisma = new PrismaClient()
        // const settings = await prisma.settings.findMany()

        // const credentials: IAuth = {
        //     username: settings[0].login, //|| process.env.RK7_LOGIN,
        //     password: settings[0].password, //|| process.env.RK7_PASSWORD,
        // }

        // const URL = settings[0].url //|| process.env.RK7_URL
        // const request = await axios.post(URL, xmlQuery, {
        //     httpsAgent: agent,
        //     auth: credentials,
        //     timeout: 3000,
        //     headers: {
        //         "Content-Type": "text/xml",
        //     },
        // })
        const request = await externalAPI.post("/", xmlQuery)

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
