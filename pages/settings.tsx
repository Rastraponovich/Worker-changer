import React, {
    useMemo,
    useState,
    useEffect,
    ChangeEvent,
    ChangeEventHandler,
} from "react"
import { connect } from "react-redux"
import { NextPage } from "next"

import { ISettings } from "@/interfaces/mainStoreType"
import { NextThunkDispatch } from "store"
import { getSettinsAciton, saveSettinsAciton } from "store/actions/mainActions"
import { RootState } from "store/reducers"

import Layout from "@/components/Layout/Layout"
import UIButton from "@/components/UI/Button/UIButton"
import UIInput from "@/components/UI/Input/UIInput"
import UIButtonGroup from "@/components/UI/UIButtonGroup/UIButtonGroup"

interface InputProps extends RootState {
    dispatch: NextThunkDispatch
}

const defaultSettings: ISettings = {
    login: "login",
    name: "name",
    password: "password",
    port: 86,
    mainParentIdent: 1,
    ref: "localhost",
    id: null,
    isActive: false,
    selected: true,
    url: "",
}

const SettingsPage: NextPage<InputProps> = ({ dispatch, mainState }) => {
    const { settings, currentSettings, currentSettingsId } = mainState

    const [data, setData] = useState<ISettings>(defaultSettings)

    const memoData = useMemo(() => data, [data])

    const initPage = async () => {
        await getSettings()
    }

    const getSettings = async () => {
        await dispatch(await getSettinsAciton())
    }

    const handleSave = async () => {
        await dispatch(await saveSettinsAciton(data))
    }

    useEffect(() => {
        if (currentSettingsId === null) {
            initPage()
        }
    }, [currentSettingsId])

    useEffect(() => {
        setData(currentSettings)
    }, [currentSettingsId])

    useEffect(() => {
        generateUrl()
    }, [data.port, data.ref])

    const generateUrl = () => {
        const url = `https://${memoData.ref}:${memoData.port}/rk7api/v0/xmlinterface.xml`
        setData({ ...data, url })
        console.log(data)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target
        setData({ ...data, [id]: value })
    }

    return (
        <Layout title="Настройки">
            <h3>Настройки подключения</h3>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "1rem 2rem",
                    alignSelf: "start",
                }}
            >
                <UIInput
                    value={memoData.name}
                    id="name"
                    onChange={onChange}
                    label="Наименование"
                />

                <UIInput
                    value={memoData.login}
                    id="login"
                    onChange={onChange}
                    label="Логин"
                />

                <UIInput
                    type="password"
                    value={memoData.password}
                    id="password"
                    onChange={onChange}
                    label="Пароль"
                />

                <UIInput
                    value={memoData.port}
                    id="port"
                    onChange={onChange}
                    label="Порт"
                />

                <UIInput
                    value={memoData.ref}
                    id="ref"
                    onChange={onChange}
                    label="ip сервера"
                />

                <UIInput
                    value={memoData.mainParentIdent}
                    id="mainParentIdent"
                    onChange={onChange}
                    label="группка кассиров"
                />
            </div>
            <span>Строка подключения: {memoData.url}</span>

            <UIButtonGroup>
                <UIButton title="Сохранить" onClick={handleSave} />
                <UIButton title="Загрузить" onClick={getSettings} />
                <UIButton title="Назад" onClick={generateUrl} />
            </UIButtonGroup>
        </Layout>
    )
}

export default connect((state: RootState) => state)(SettingsPage)
