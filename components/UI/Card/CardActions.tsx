import React, { memo, FC, ReactNode } from "react"
import styles from "./card.module.css"
interface InputProps {
    children: ReactNode
}

const CardActions: FC<InputProps> = ({ children }) => {
    return <div className={styles.actions}>{children}</div>
}

export default memo(CardActions)
