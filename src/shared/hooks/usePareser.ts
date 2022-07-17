import { parse, validate, X2jOptionsOptional } from "fast-xml-parser"
import he from "he"
import type { ParserInputProps } from "src/shared/lib/models"
/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const arrayObjOptions: X2jOptionsOptional = {
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
    arrayMode: (tagName, parentTagName) => parseArray(tagName, parentTagName),
    attrValueProcessor: (val: string) => he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val: string) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"],
}

export const useParser: ParserInputProps = (xmlData: string): any => {
    let jsonObj = {}

    if (validate(xmlData) === true) {
        jsonObj = parse(xmlData, arrayObjOptions)
    }
    return jsonObj
}

const tagNameRules = {
    RK7QueryResult: false,
    SystemInfo: false,
    SourceCommand: false,
    RK7Reference: false,
}

const parentTagNameRules = {
    RK7QueryResult: false,
    SourceCommand: false,
    RK7Reference: false,
}

export const parseArray = (tagName: string, parentTagName: string) => {
    if (tagName in tagNameRules) return tagNameRules[tagName]

    if (parentTagName in parentTagNameRules) return parentTagNameRules[parentTagName]

    return true
}
