import React, { FC, memo } from "react"

interface InputProps {
    state: boolean
    styles: {
        readonly [key: string]: string
    }
}

const HeaderStatusIndicator: FC<InputProps> = ({ state, styles }) => {
    return (
        <>
            {state ? (
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
        </>
    )
}

export default memo(HeaderStatusIndicator)
