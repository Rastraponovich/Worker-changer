import { useTypeSelector } from "@/hooks/useTypeSelector"
import React, { memo, FC } from "react"
import { useStore } from "react-redux"
import { NextThunkDispatch } from "store"
import SettingsCard from "./SettingsCard"

interface InputProps {}

const Settings: FC<InputProps> = () => {
    const { settings } = useTypeSelector((store) => store.mainState)

    const dispatch = useStore().dispatch as NextThunkDispatch

    return (
        <div>
            <h2>Список конфигурации</h2>
            {settings.map((el) => (
                <SettingsCard setting={el} key={el.id} />
            ))}
        </div>
    )
}

export default memo(Settings)
