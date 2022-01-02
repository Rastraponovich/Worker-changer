import { IAuth } from "@/interfaces/types"
import axios from "axios"
import { Agent } from "https"

const iternalAPI = axios.create({ baseURL: "http://localhost:3000/api" })

const agent = new Agent({
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method",
})

const credentials: IAuth = {
    username: process.env.RK7_LOGIN,
    password: process.env.RK7_PASSWORD,
}

const externalAPI = axios.create({
    baseURL: process.env.RK7_URL,
    httpsAgent: agent,
    auth: credentials,
    timeout: 3000,
    headers: {
        "Content-Type": "text/xml",
    },
})

export { iternalAPI, externalAPI }
