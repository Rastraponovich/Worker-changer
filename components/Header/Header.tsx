import React from "react"
import styles from "../../styles/Home.module.css"
const Header = () => {
    return (
        <header className={styles.header}>
            <h2>Настройка кассиров</h2>
        </header>
    )
}

export default React.memo(Header)
