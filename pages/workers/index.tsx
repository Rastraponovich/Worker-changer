import React from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import WorkerCard from "@/components/WorkerCard/WorkerCard"
import { IWorker } from "@/types/types"
import { sendData } from "@/hooks/useGetData"
import { useParser } from "@/hooks/usePareser"

import styles from "@/styles/Home.module.css"
import Layout from "@/components/Layout/Layout"
import { getEmployees } from "schemas/schema"

interface InputProps {
    workers: IWorker[]
    commandResult: {}
}

const WorkersList: React.FC<InputProps> = ({ workers, commandResult }) => {
    const router = useRouter()
    return (
        <Layout>
            <section className={styles.grid}>
                {workers.map((worker) => (
                    <WorkerCard key={worker.GUIDString} {...worker} />
                ))}
                <button className={styles.button} onClick={() => router.back()}>
                    Назад
                </button>
            </section>
        </Layout>
    )
}

export default React.memo(WorkersList)

export const getServerSideProps: GetServerSideProps = async () => {
    const schema = getEmployees()
    const response = useParser(await sendData(schema))
    const { CommandResult } = response.RK7QueryResult[0]
    const { SourceCommand, RK7Reference, ...commandResult } = CommandResult[0]
    const workers: IWorker[] = RK7Reference[0].Items[0].Item.filter(
        (worker: IWorker) => worker.Status !== "rsDeleted"
    )

    return {
        props: {
            workers,
            commandResult,
        },
    }
}
