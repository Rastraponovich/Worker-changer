import axios from "axios"
import { Agent } from "https"

import { IAuth } from "@/types/types"

const credentials: IAuth = {
    username: process.env.RK7_LOGIN,
    password: process.env.RK7_PASSWORD,
}

const agent = new Agent({
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method",
})
export const sendData = async (xmlQuery: string): Promise<string | any> => {
    try {
        const URL = process.env.RK7_URL
        const request = await axios.post(URL, xmlQuery, {
            httpsAgent: agent,
            auth: credentials,
            timeout: 3000,
            headers: {
                "Content-Type": "text/xml",
            },
        })
        return { error: false, data: request.data }
    } catch (error) {
        const { isAxiosError, code } = error

        return {
            error: true,
            isAxiosError,
            code,
        }
    }
}
