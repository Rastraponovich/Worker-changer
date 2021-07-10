import React, {
    FC,
    memo,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import styles from "@/styles/Header.module.css"
import ThingsContext, { IContextTheme } from "../App/ThingsContext"
import { IStatus } from "@/types/types"
interface InputProps {
    status: IStatus
}

const Header: FC<InputProps> = ({ status }) => {
    const context = useContext(ThingsContext)
    return (
        <header style={context.theme.header}>
            <a href="/" className={styles.title}>
                Настройка кассиров
            </a>
            <div className="bulk"></div>
            <span>Статус сервера: {status.Status}</span>
        </header>
    )
}

export default memo(Header)
