import { ISettings } from "@/interfaces/mainStoreType"
import React, { memo, FC, ChangeEventHandler, ChangeEvent } from "react"
import { Path, UseFormRegister } from "react-hook-form"

import styles from "./UIInput.module.css"

type InputProps = {
    value: string | number
    label: string
    onChange: ChangeEventHandler<HTMLInputElement>
    type?: string
    id: string
}

const UIInput = ({ label, type = "text", onChange, value, id }: InputProps) => {
    return (
        <label className={styles.label}>
            <span className={styles.title}>{label}</span>
            <input
                className={styles.input}
                id={id}
                type={type}
                onChange={(e) => onChange(e)}
                value={value}
            />
        </label>
    )
}

export default memo(UIInput)
