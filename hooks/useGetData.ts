import axios from "axios"
import { IAuth } from "../types/types"
import { useParser } from "./usePareser"

const https = require("https")

const credentials: IAuth = {
    username: process.env.RK7_LOGIN,
    password: process.env.RK7_PASSWORD,
}

const agent = new https.Agent({
    rejectUnauthorized: false,
    agent: false,
    secureProtocol: "TLSv1_method",
})
export const sendData = async (xmlQuery: string) => {
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
