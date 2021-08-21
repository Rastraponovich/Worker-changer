import Layout from "@/components/Layout/Layout"
import Settings from "@/components/Settings/Settings"
import prisma from "lib/prisma"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { memo, FC } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { NextThunkDispatch } from "store"
import { getSettinsAciton, startInitAction } from "store/actions/mainActions"
import { RootState } from "store/reducers"

interface InputProps extends RootState {
    dispatch: NextThunkDispatch
}

const MainPage: NextPage<InputProps> = ({ dispatch, mainState }) => {
    const { currentSettingsId } = mainState

    const { push } = useRouter()

    const getSettings = async () => {
        await dispatch(await getSettinsAciton())
    }

    useEffect(() => {
        if (currentSettingsId === null) {
            setTimeout(() => {
                getSettings()
            }, 10000)
        } else {
            push("/workers")
        }
    }, [currentSettingsId])

    return (
        <Layout title="Главная страница">
            <h2 className="title">Инициализация приложения</h2>
            <h3>Загрузка конфигурации</h3>
        </Layout>
    )
}

export default connect((state: RootState) => state)(MainPage)
