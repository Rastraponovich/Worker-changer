import Layout from "@/components/Layout/Layout"

import { allSettled, fork, serialize } from "effector"
import { useStore } from "effector-react"
import { useEvent } from "effector-react/scope"
import { $initalState, getStatus } from "features/initialApp"
import { $workers, getWorkers } from "features/workers"
import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import React, { memo, FC } from "react"
import { useEffect } from "react"

interface MainPageProps {}

const MainPage: NextPage<MainPageProps> = () => {
    const { push } = useRouter()

    const initialState = useStore($initalState)

    useEffect(() => {
        if (initialState) {
            setTimeout(() => {
                push("/workers")
            }, 3000)
        }
    }, [initialState])

    const workers = useStore($workers)
    return (
        <Layout title="Главная страница">
            <h2 className="title">Инициализация приложения</h2>
            {!initialState && <h3>Загрузка конфигурации</h3>}

            {initialState && <h3>Работников получено: {workers.length}</h3>}
        </Layout>
    )
}

export default memo(MainPage)

export const getStaticProps: GetStaticProps = async () => {
    const scope = fork()

    await allSettled(getStatus, { scope })

    const serialized = serialize(scope)

    return {
        props: { initialState: serialized },
    }
}
