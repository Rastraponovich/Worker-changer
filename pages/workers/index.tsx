import { GetStaticProps, NextPage } from "next"
import React, { memo, useEffect } from "react"

import Layout from "@/components/Layout/Layout"
import InfoBlock from "@/components/InfoBlock/InfoBlock"
import { useEvent, useStore } from "effector-react/scope"
import {
    $errorGetWorker,
    $getWorkersStatus,
    $loadingWorkers,
    getWorkers,
} from "features/workers"
import { allSettled, fork, serialize } from "effector"
import CashierList from "@/components/CashierList/CashierList"
import { useRouter } from "next/router"

interface WorkersPageProps {}

const WorkersPage: NextPage<WorkersPageProps> = () => {
    const loading = useStore($loadingWorkers)

    const error = useStore($errorGetWorker)

    const handleGetStatus = useEvent(getWorkers)
    const router = useRouter()

    useEffect(() => {
        if (error) {
            router.push("/401")
        }
    }, [error, router])

    return (
        <Layout title="Настройка кассиров">
            <button onClick={handleGetStatus}>refresh</button>
            <InfoBlock />
            {loading && <h2 className="my-4">Идет загрузка</h2>}
            {!loading && <CashierList />}
        </Layout>
    )
}

export default memo(WorkersPage)

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()

    await allSettled(getWorkers, { scope })

    const serialized = serialize(scope)
    return { props: { initialState: serialized } }
}