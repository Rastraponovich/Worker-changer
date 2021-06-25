import React, { FC, memo } from "react"
import styles from "@/styles/Header.module.css"
import HeaderStatusIndicator from "@/components/Header/HeaderStatusIndicator"
interface HeaderInputProps {
    serverState: boolean
}

const Header: FC<HeaderInputProps> = ({ serverState }) => {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.title}>
                Настройка кассиров
            </a>
            <div className="bulk"></div>
            <HeaderStatusIndicator state={serverState} styles={styles} />
        </header>
    )
}

export default memo(Header)
