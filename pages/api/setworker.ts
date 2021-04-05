const parser = require("fast-xml-parser")
const https = require("https")
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { IAuth, IWorker } from "../../types/types"
const he = require("he")

const agent = new https.Agent({
    rejectUnauthorized: false,
    agent: false,
    secureProtocol: "TLSv1_method",
})

const arrayObjOptions = {
    attributeNamePrefix: "",
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: true,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: "__cdata",
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: true,
    attrValueProcessor: (val: string, attrName: string) =>
        he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val: string, tagName: string) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"],
}

const credentials: IAuth = {
    username: process.env.RK7_LOGIN,
    password: process.env.RK7_PASSWORD,
}

const xmlParser = (xmlData: string) => {
    let jsonObj = {}

    if (parser.validate(xmlData) === true) {
        jsonObj = parser.parse(xmlData, arrayObjOptions)
    }

    return jsonObj
}

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
        const result = xmlParser(request.data)
        return result
    } catch (error) {
        return error
    }
}

const handleSave = async (worker: IWorker) => {
    const xmlQuery = `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="SetRefData" RefName="Employees">
        <Items>
            <Item 
              GUIDString="${worker.GUIDString}" 
              genTaxPayerIdNum="${worker.genTaxPayerIdNum}"
              OfficialName="${worker.OfficialName}"/>
        </Items>
    </RK7Command2>
  </RK7Query>`
    const result = await sendData(xmlQuery)
    return result
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { worker } = req.body
    const result = await handleSave(worker)

    const { CommandResult, ...queryResult } = result.RK7QueryResult[0]

    res.status(200).json({ queryResult, commandResult: CommandResult[0] })
}
