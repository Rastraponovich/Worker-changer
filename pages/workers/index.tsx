import React from "react"
import { useRouter } from "next/router"
import WorkerCard from "../../components/WorkerCard/WorkerCard"
import { IWorker } from "../../types/types"
import styles from "../../styles/Home.module.css"
import { GetServerSideProps } from "next"
import { sendData } from "../index"
import Layout from "../../components/Layout/Layout"

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
    const xmlQuery = `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="EMPLOYEES" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)"  >
            <PROPFILTERS>
                <PROPFILTER name="MainParentIdent" value="${process.env.MAINPARENTIDENT}"/>

            </PROPFILTERS>
        </RK7Command2>
    </RK7Query>`
    const response = await sendData(xmlQuery)
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
