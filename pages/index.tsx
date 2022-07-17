import { useEffect } from "react"
import { useRouter } from "next/router"
import { useEvent, useStore } from "effector-react"
import { fork, allSettled, serialize } from "effector"

import type { GetStaticProps } from "next"

import { $initalState, startApp } from "features/initialApp"
import { $errorGetWorker, $getWorkersStatus, $workers, getWorkers } from "features/workers"

import { Layout } from "src/widgets/layout"

const MainPage = () => {
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
