import Layout from "@/components/Layout/Layout"
import { useRouter } from "next/router"
import React, { memo, FC } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { NextThunkDispatch } from "store"
import { startInitAction } from "store/actions/mainActions"
import { RootState } from "store/reducers"

interface InputProps extends RootState {
    dispatch: NextThunkDispatch
}

const MainPage: FC<InputProps> = ({ dispatch, mainState }) => {
    const { init, hasConfig } = mainState

    const { push } = useRouter()

    const startInit = async () => {
        await dispatch(await startInitAction())
    }

    // useEffect(() => {
    //     if (init) {
    //         push("/workers")
    //     } else {
    //         setTimeout(() => {
    //             startInit()
    //         }, 3000)
    //     }
    // }, [init])

    return (
        <Layout title="Главная страница">
            <h2 className="title">Инициализация приложения</h2>
            <h3>{hasConfig ? null : "Загрузка конфигурации"}</h3>
        </Layout>
    )
}

export default connect((state: RootState) => state)(MainPage)
