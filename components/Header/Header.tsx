import React from "react"
import styles from "../../styles/Header.module.css"
const Header = () => {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.title}>
                Настройка кассиров
            </a>
            {/* <span
                className={
                    serverState ? styles.circleActive : styles.circleInActive
                }
            ></span> */}
        </header>
    )
}

export default React.memo(Header)
