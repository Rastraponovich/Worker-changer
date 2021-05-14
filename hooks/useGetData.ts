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
export const sendData = async (xmlQuery: string): Promise<any> => {
    try {
        const URL = process.env.RK7_URL
        const request = await axios.post(URL, xmlQuery, {
            httpsAgent: agent,
            auth: credentials,
            headers: {
                "Content-Type": "text/xml",
            },
        })
        return request.data
    } catch (error) {
        return error
    }
}
