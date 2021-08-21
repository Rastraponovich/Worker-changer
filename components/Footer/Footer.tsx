import React, { FC, memo, useContext, useEffect, useState } from "react"
import { IStatus } from "interfaces/types"
import ThingsContext from "../App/ThingsContext"
import styles from "./footer.module.css"
interface InputProps {
    status?: IStatus
}

const Footer: FC<InputProps> = ({ status }) => {
    const [time, setTime] = useState("")
    const context = useContext(ThingsContext)

    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleString())
        }, 1000)
    }, [status])

    return (
        <footer style={context.theme.footer}>
            <span className={styles.footerText}>Версия программы: 0.2.3</span>
            <span className={styles.footerText}>
                Версия сервера: {status.ServerVersion}
            </span>
            <span className={styles.footerText}>
                Имя сервера: {status.NetName}
            </span>
            <span className={styles.footerText}>{time}</span>
        </footer>
    )
}

export default memo(Footer)
