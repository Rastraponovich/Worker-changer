import { ISettings } from "@/interfaces/mainStoreType"
import React, { memo, FC } from "react"

interface InputProps {
    setting: ISettings
}

const SettingsCard: FC<InputProps> = ({ setting }) => {
    return (
        <div>
            <h2>{setting.name}</h2>
        </div>
    )
}

export default memo(SettingsCard)
