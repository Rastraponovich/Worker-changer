import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { GetServerSideProps, GetStaticProps } from "next"
import React, { useCallback, useContext, useEffect, useState } from "react"

import { InputProps, IWorker } from "@/types/types"
import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"

import Layout from "@/components/Layout/Layout"
import Modal from "@/components/Modal/Modal"

import InfoBlock from "@/components/InfoBlock/InfoBlock"
import CashierBlock from "@/components/CashierBlock/CashierBlock"
import Button from "@/components/UI/Button/Button"
import styles from "@/styles/Home.module.css"
import { getEmployees } from "schemas/schema"
import ThingsContext from "@/components/App/ThingsContext"

const Home: React.FC<InputProps> = ({ workers, status, commandResult }) => {
    const context = useContext(ThingsContext)

    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [serverState, setServerState] = useState(status.Status === "Ok")

    const refreshStatus = async () => {
        const result: AxiosResponse<any> = await axios.get("/api/getStatus")
        if (result.data.error) {
            setServerState(false)
        } else {
            setServerState(true)
        }
    }

    useEffect(() => {
        setInterval(() => {
            console.log("refresh")
            refreshStatus()
        }, 30000)
    }, [])

    const handleShowModal = useCallback(
        (text: string) => {
            setModalMessage(text)
            setShowModal(!showModal)
        },
        [showModal]
    )

    const handleClick = () => {
        setModalMessage("")
        setShowModal(false)
        router.reload()
    }

    const handleOpenModal = useCallback(() => {
        setModalMessage("")
        setShowModal(!showModal)
    }, [showModal])

    return (
        <Layout serverState={serverState} status={status}>
            <InfoBlock styles={styles} show={serverState} />
            <CashierBlock
                workers={workers}
                styles={styles}
                showModal={handleShowModal}
                state={serverState}
            />
            <Modal show={showModal} onClose={handleOpenModal}>
                <p>{modalMessage}</p>
                <button className={styles.modalButton} onClick={handleClick}>
                    Продолжить
                </button>
            </Modal>
        </Layout>
    )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
    const employeesSchema = getEmployees()

    const employeesData: {
        error: boolean
        data: string
        isAxiosError?: boolean
        code?: string | number
    } = await sendData(employeesSchema)
    const { error, data, isAxiosError, code } = employeesData

    if (code === 401) {
        return {
            redirect: { destination: "401", statusCode: 301 },
            props: {},
        }
    }

    if (!error) {
        const response = useParser(data)
        const { CommandResult, ...status } = response.RK7QueryResult[0]
        const {
            SourceCommand,
            RK7Reference,
            ...commandResult
        } = CommandResult[0]

        const workers: IWorker[] = RK7Reference[0].Items[0].Item.filter(
            (worker: IWorker) => worker.Status !== "rsDeleted"
        )
        return {
            props: {
                workers,
                status,
                commandResult,
            },
            revalidate: 30,
        }
    } else {
        return {
            props: {
                status: {
                    Status: "no ok",
                    isAxiosError,
                    text: code || "",
                },
            },
        }
    }
}
