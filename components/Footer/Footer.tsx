import React, { FC, memo, useEffect, useState } from "react"
import { IStatus } from "@/types/types"
import styles from "@/styles/Footer.module.css"

interface InputProps {
    status?: IStatus
}

const Footer: FC<InputProps> = ({ status }) => {
    const [time, setTime] = useState("")

    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            setTime(date.toLocaleString())
        }, 1000)
    }, [status])

    return (
        <footer className={styles.footer}>
            <span>Версия сервера: {status.ServerVersion}</span>
            <span>Имя сервера: {status.NetName}</span>
            <span>{time}</span>
        </footer>
    )
}

export default memo(Footer)
