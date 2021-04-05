import styles from "../styles/Home.module.css"
import { GetServerSideProps } from "next"
import { IAuth, InputProps, IWorker } from "../types/types"

const parser = require("fast-xml-parser")
const https = require("https")
import axios from "axios"
const he = require("he")

import { useRouter } from "next/router"
import Layout from "../components/Layout/Layout"
import CashierForm from "../components/CashierForm/CashierForm"
import Modal from "../components/Modal/Modal"
import { useState } from "react"

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

export const sendData = async (URL: string, xmlQuery: string) => {
    try {
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

const Home: React.FC<InputProps> = ({ workers, status, commandResult }) => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [typeModal, setTypeModal] = useState("inform")

    const handleShowModal = (text: string, type: string) => {
        setModalMessage(text)
        setTypeModal(type)
        setShowModal(!showModal)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleOpenModal = () => {
        setModalMessage("")
        setTypeModal("inform")
        setShowModal(!showModal)
    }
    return (
        <Layout>
            <section className={styles.section}>
                <h1 className={styles.title}>Настройка кассиров</h1>
                <CashierForm workers={workers} showModal={handleShowModal} />
                <div style={{ flexGrow: 1 }} />
                <button
                    className={styles.button}
                    onClick={() => router.push("/workers")}
                >
                    Работники
                </button>
            </section>
            <Modal
                type={typeModal}
                text={modalMessage}
                show={showModal}
                onClose={handleOpenModal}
            />
        </Layout>
    )
}
export default Home
//PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)"
export const getServerSideProps: GetServerSideProps = async () => {
    const xmlQuery = `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="EMPLOYEES" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
            <PROPFILTERS>
                <PROPFILTER name="MainParentIdent" value="${process.env.MAINPARENTIDENT}"/>

            </PROPFILTERS>
        </RK7Command2>
    </RK7Query>`
    const response = await sendData(process.env.RK7_URL, xmlQuery)
    const { CommandResult, ...status } = response.RK7QueryResult[0]
    const { SourceCommand, RK7Reference, ...commandResult } = CommandResult[0]
    const workers: IWorker[] = RK7Reference[0].Items[0].Item.filter(
        (worker: IWorker) => worker.Status !== "rsDeleted"
    )

    return {
        props: {
            workers,
            status,
            commandResult,
        },
    }
}
