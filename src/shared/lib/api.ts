import { IAuth } from "src/shared/lib/models"
import axios from "axios"
import { Agent } from "https"

const iternalAPI = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_SELF_HOST}/api` })

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
