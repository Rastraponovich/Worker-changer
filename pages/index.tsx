import Layout from "@/components/Layout/Layout"

import { allSettled, fork, serialize } from "effector"
import { useStore } from "effector-react"
import { useEvent } from "effector-react/scope"
import { $initalState, getStatus, startApp } from "features/initialApp"
import { $errorGetWorker, $getWorkersStatus, $workers, getWorkers } from "features/workers"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import React, { memo, FC } from "react"
import { useEffect } from "react"

interface MainPageProps {}

const MainPage: NextPage<MainPageProps> = () => {
    const getWorkersEvent = useEvent(getWorkers)

    useEffect(() => {
        getWorkersEvent()
    }, [])
    const { push } = useRouter()

    const error = useStore($errorGetWorker)

    const initialState = useStore($initalState)

    const loadingWorkersStatus = useStore($getWorkersStatus)

    let timerId: any
    useEffect(() => {
        if (loadingWorkersStatus) {
            setTimeout(() => {
                push("/workers")
            }, 3000)
        }
    }, [initialState, loadingWorkersStatus])

    useEffect(() => {
        if (error) {
            timerId = setTimeout(() => {
                push("/401")
            }, 4000)
        }
        return () => clearTimeout(timerId)
    }, [error])

    const workers = useStore($workers)
    return (
        <Layout title="Главная страница">
            <h2 className="title">Инициализация приложения</h2>
            {!initialState && <h3>Загрузка конфигурации</h3>}
            {initialState && (
                <div className="flex justify-between">
                    <h3>
                        Работников получено: {workers.length}
                        {" - "}
                        {loadingWorkersStatus ? "выполнено" : "ошибка"}
                    </h3>
                </div>
            )}
        </Layout>
    )
}

export default MainPage

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()

    await allSettled(startApp, { scope })

    const serialized = serialize(scope)

    return { revalidate: 10, props: { initialState: serialized } }
}
