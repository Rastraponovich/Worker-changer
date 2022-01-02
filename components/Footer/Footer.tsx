import React, { FC, memo, useEffect } from "react"
import { IStatus } from "interfaces/types"
import { useStore } from "effector-react"
import { $status, $version, startTime } from "features/initialApp"
import { useEvent } from "effector-react/scope"
import Time from "./Time"
interface FooterProps {
    status?: IStatus
}

const Footer: FC<FooterProps> = () => {
    const status = useStore($status)
    const version = useStore($version)
    const handleStartTime = useEvent(startTime)

    useEffect(() => {
        handleStartTime()
    }, [])

    return (
        <footer className="flex text-white justify-between bg-sky-900 items-center px-4 py-2">
            <span>Версия программы: {version}</span>
            <span>Версия сервера: {status?.ServerVersion}</span>
            <span>Имя сервера: {status?.NetName}</span>
            <Time />
        </footer>
    )
}

export default memo(Footer)
