import axios, { AxiosResponse } from "axios"
import { GetServerSideProps, NextPage } from "next"
import React from "react"

import Layout from "@/components/Layout/Layout"
import {
    ICommandResult,
    IStatus,
    IStatusResponse,
    IWorker,
} from "@/types/types"
import { useState } from "react"
import { useEffect } from "react"
import InfoBlock from "@/components/InfoBlock/InfoBlock"
import CashiersBlock from "@/components/CashiersBlock/CashiersBlock"
import Modal from "@/components/UI/Button/Modal/Modal"

interface InputProps {
    status: IStatus
    workers: IWorker[]
}

interface IWorkersResponse {
    workers: IWorker[]
    commandResult: ICommandResult
    status?: IStatus
    error: boolean
    isAxiosError: boolean
}

const StartPage: NextPage<InputProps> = ({ status }) => {
    const [loading, setLoading] = useState(true)
    const [workers, setWorkers] = useState<IWorker[]>([])
    const [statusMessage, setStatusMessage] = useState("Идет загрузка...")

    const getWorkers = async () => {
        const request: AxiosResponse<IWorkersResponse> = await axios.get(
            "/api/workers"
        )
        setWorkers(request.data.workers)
    }

    useEffect(() => {
        if (workers.length > 0) {
            setLoading(false)
        }
        return setStatusMessage("Сотрудники загружены")
    }, [workers])

    useEffect(() => {
        if (status.Status) {
            setTimeout(() => {
                getWorkers()
            }, 3000)
        }
        return setStatusMessage("Попытка загрузить сотрудников")
    }, [status.Status])

    useEffect(() => {
        setTimeout(() => {
            setStatusMessage("")
        }, 3000)
    }, [loading])

    const handleShowModal = () => {}

    return (
        <Layout status={status}>
            <InfoBlock loading={loading} />
            <CashiersBlock
                workers={workers}
                status={status}
                statusMessage={statusMessage}
            />
        </Layout>
    )
}
export default StartPage

export const getServerSideProps: GetServerSideProps = async () => {
    const request: AxiosResponse<IStatusResponse> = await axios.get(
        "http://localhost:3000/api/getStatus"
    )

    if (!request.data.error) {
        return {
            props: {
                status: request.data.queryResult,
            },
        }
    } else {
        return {
            props: {},
            redirect: {
                destination: "404",
                basePath: true,
            },
        }
    }
}
