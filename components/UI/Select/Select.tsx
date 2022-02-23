import clsx from "clsx"
import React, { memo, ChangeEvent } from "react"

interface SelectProps {
    children: React.ReactNode
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ children, onChange }: SelectProps) => {
    return (
        <select
            onChange={onChange}
            className={clsx(
                "outline-4 focus:outline-yellow-300",
                "focus-within::outline-yellow-300 outline-4",
                "mb-4 cursor-pointer rounded py-4 px-3 text-base font-normal text-sky-900"
            )}
        >
            {children}
        </select>
    )
}

export default memo(Select)
