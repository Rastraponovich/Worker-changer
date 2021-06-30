import React, { FC, memo, useContext, useEffect, useState } from "react"
import { IStatus } from "@/types/types"
import ThingsContext from "../App/ThingsContext"

interface InputProps {
    status?: IStatus
}

const Footer: FC<InputProps> = ({ status }) => {
    const [time, setTime] = useState("")
    const context = useContext(ThingsContext)

    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            setTime(date.toLocaleString())
        }, 1000)
    }, [status])

    return (
        <footer style={context.theme.footer}>
            <span>Версия сервера: {status.ServerVersion}</span>
            <span>Имя сервера: {status.NetName}</span>
            <span>{time}</span>
        </footer>
    )
}

export default memo(Footer)
