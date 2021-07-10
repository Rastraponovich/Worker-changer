import axios, { AxiosResponse } from "axios"
import { GetServerSideProps, NextPage } from "next"
import React from "react"

import Layout from "@/components/Layout/Layout"
import {
    IStatus,
    IStatusResponse,
    IWorker,
    IWorkersResponse,
} from "@/types/types"
import { useState } from "react"
import { useEffect } from "react"
import InfoBlock from "@/components/InfoBlock/InfoBlock"
import CashiersBlock from "@/components/CashiersBlock/CashiersBlock"

interface InputProps {
    status: IStatus
    workers: IWorker[]
}

const StartPage: NextPage<InputProps> = ({ status, workers }) => {
    return (
        <Layout status={status}>
            <InfoBlock />
            <CashiersBlock workers={workers} status={status} />
        </Layout>
    )
}
export default StartPage

export const getServerSideProps: GetServerSideProps = async () => {
    const statusRequest: AxiosResponse<IStatusResponse> = await axios.get(
        "http://localhost:3000/api/getStatus"
    )
    const { error, queryResult } = statusRequest.data

    if (!error) {
        const workersRequest: AxiosResponse<IWorkersResponse> = await axios.get(
            "http://localhost:3000/api/workers"
        )
        const { workers } = workersRequest.data
        return {
            props: { workers, status: queryResult },
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
