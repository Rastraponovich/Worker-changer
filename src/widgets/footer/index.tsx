import { useEffect } from "react"
import { $status, $time, $version, startTime } from "features/initialApp"
import { useEvent, useStore } from "effector-react/scope"

export const Footer = () => {
    const status = useStore($status)
    const version = useStore($version)
    const handleStartTime = useEvent(startTime)

    useEffect(() => {
        handleStartTime()
    }, [])

    return (
        <footer className="  grid grid-cols-4 items-center justify-items-center bg-sky-900  px-4 py-2 text-white lg:grid-cols-12">
            <span className="col-span-2 justify-self-start lg:col-span-3">Версия программы: {version}</span>
            <span className="col-span-2 justify-self-end lg:col-span-3 lg:justify-self-center">
                Версия сервера: {status?.ServerVersion}
            </span>
            <span className="col-span-2 justify-self-start lg:col-span-3 lg:justify-self-center">
                Имя сервера: {status?.NetName}
            </span>
            <Time />
        </footer>
    )
}

const Time = () => {
    const time = useStore($time)
    return <span className="col-span-2 justify-self-end lg:col-span-3">{time}</span>
}
