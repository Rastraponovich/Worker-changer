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
        <footer className="  grid grid-cols-4 lg:grid-cols-12 text-white justify-items-center  bg-sky-900 items-center px-4 py-2">
            <span className="col-span-2 lg:col-span-3 justify-self-start">
                Версия программы: {version}
            </span>
            <span className="justify-self-end lg:justify-self-center col-span-2 lg:col-span-3">
                Версия сервера: {status?.ServerVersion}
            </span>
            <span className="justify-self-start lg:justify-self-center col-span-2 lg:col-span-3">
                Имя сервера: {status?.NetName}
            </span>
            <Time />
        </footer>
    )
}

export default memo(Footer)
