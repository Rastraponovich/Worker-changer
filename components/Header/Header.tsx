import React, { FC } from "react"
import styles from "../../styles/Header.module.css"

interface HeaderInputProps {
    serverState: boolean
}

const Header: FC<HeaderInputProps> = ({ serverState }) => {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.title}>
                Настройка кассиров
            </a>
            <div style={{ flexGrow: 1 }}></div>

            {serverState ? (
                <div className={styles.statusBlock}>
                    <span>Статус сервера: Работает</span>
                    <span className={styles.circleActive}></span>
                </div>
            ) : (
                <div className={styles.statusBlock}>
                    <span>Статус сервера: не работает</span>

                    <span className={styles.circleInActive}></span>
                </div>
            )}
        </header>
    )
}

export default Header
