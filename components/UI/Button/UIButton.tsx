import React, { memo, FC } from "react"
import styles from "./UIButton.module.css"
interface InputProps {
    onClick?: () => void
    title: string
}

const UIButton: FC<InputProps> = ({ onClick, title }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{title}</span>
        </button>
    )
}

export default memo(UIButton)
