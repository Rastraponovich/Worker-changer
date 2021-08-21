import React, { memo, FC, ReactNode } from "react"
import styles from "./card.module.css"

interface InputProps {
    children: ReactNode
}

const CardContent: FC<InputProps> = ({ children }) => {
    return <div className={styles.content}>{children}</div>
}

export default memo(CardContent)
