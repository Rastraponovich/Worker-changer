import React, { memo, FC } from "react"
import { ReactNode } from "react"
import styles from "./card.module.css"
interface InputProps {
    children?: ReactNode
    title: string
    getInfo: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

const CardTitle: FC<InputProps> = ({ title, getInfo }) => {
    return (
        <div className={styles.header}>
            <h3> Кассир: {title}</h3>
            <button className={styles.button} onClick={getInfo}>
                Обновить
            </button>
        </div>
    )
}

export default memo(CardTitle)
