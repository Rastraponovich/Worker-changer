import React from "react"
import styles from "../../styles/Home.module.css"

const NoData = () => {
    return (
        <div className={styles.errorBlock}>
            <h2 className={styles.errorMessage}>Нет Связи. попробуйте снова</h2>
        </div>
    )
}

export default NoData
