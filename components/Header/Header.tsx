import React, {
    FC,
    memo,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import styles from "@/styles/Header.module.css"
import HeaderStatusIndicator from "@/components/Header/HeaderStatusIndicator"
import ThingsContext, { IContextTheme } from "../App/ThingsContext"
interface InputProps {
    serverState: boolean
}

const Header: FC<InputProps> = ({ serverState }) => {
    const context = useContext(ThingsContext)
    return (
        <header style={context.theme.header}>
            <a href="/" className={styles.title}>
                Настройка кассиров
            </a>
            <div className="bulk"></div>
            <HeaderStatusIndicator state={serverState} styles={styles} />
        </header>
    )
}

export default memo(Header)
