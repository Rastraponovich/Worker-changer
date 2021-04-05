const parser = require("fast-xml-parser")
const https = require("https")
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { IAuth, IWorker } from "../../../types/types"
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
    username: "Wilde",
    password: "1024",
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

const getUserByGuid = async (guid: string | string[]) => {
    const xmlQuery = `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="GetRefData" RefName="Employees" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
        <PROPFILTERS>
            <PROPFILTER name="GUIDString" value="${guid}" />
        </PROPFILTERS>
    </RK7Command2>
  </RK7Query>`
    const result = await sendData(xmlQuery)
    return result
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { guid } = req.query
    const result = await getUserByGuid(guid)

    const { CommandResult, ...queryResult } = result.RK7QueryResult[0]
    const { SourceCommand, RK7Reference, ...commandResult } = CommandResult[0]

    res.status(200).json({
        queryResult,
        commandResult,
        RK7Reference: RK7Reference[0],
        sourceCommand: SourceCommand[0],
    })
}
