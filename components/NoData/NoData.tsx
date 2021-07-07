import React, { memo } from "react"
import styles from "@/styles/Home.module.css"

const NoData = () => {
    return (
        <>
            <video
                src="/videoplayback.mp4"
                height="100%"
                width="100%"
                muted
                autoPlay
                loop
            />
            <div className={styles.errorBlock}>
                <h2 className={styles.errorMessage}>Нет связи с сервером</h2>
                <h2 className={styles.errorMessage}>
                    Свяжитесь с технической поддержкой
                </h2>
            </div>
        </>
    )
}

export default memo(NoData)
