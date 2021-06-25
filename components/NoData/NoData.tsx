import React from "react"
import styles from "@/styles/Home.module.css"

const NoData = () => {
    return (
        <div className={styles.errorBlock}>
            <h2 className={styles.errorMessage}>Нет связи с сервером</h2>
            <p>Свяжитесь с технической поддержкой</p>
        </div>
    )
}

export default NoData
