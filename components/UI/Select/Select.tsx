import clsx from "clsx"
import React, { memo, FC, ChangeEvent } from "react"

import styles from "./select.module.css"

interface InputProps {
    children: React.ReactNode
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<InputProps> = ({ children, onChange }) => {
    return (
        <select
            onChange={onChange}
            className={clsx(
                "focus:outline-yellow-300 outline-4",
                "focus-within::outline-yellow-300 outline-4",
                "cursor-pointer py-4 px-3 mb-4 text-sky-900 text-base rounded font-normal"
            )}
        >
            {children}
        </select>
    )
}

export default memo(Select)
