import React, { memo, FC, ChangeEvent } from "react"

import styles from "./select.module.css"

interface InputProps {
    children: React.ReactNode
    type?: string
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<InputProps> = ({ children, type, onChange }) => {
    return (
        <select id={type} onChange={onChange} className={styles.input}>
            {children}
        </select>
    )
}

export default memo(Select)
