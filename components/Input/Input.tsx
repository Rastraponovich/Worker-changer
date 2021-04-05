import React from "react"
import { Path, UseFormRegister } from "react-hook-form"
import styles from "../../styles/Home.module.css"

interface IFormValues {
    name: string
    inn: string
    value: string
}

type InputProps = {
    value: Path<IFormValues>
    label: string
    type: string
    register: UseFormRegister<IFormValues>
    required: boolean
}

const Input: React.FC<InputProps> = ({
    label,
    value,
    register,
    required,
    type,
}) => {
    return (
        <label className={styles.label}>
            <span>{label}</span>
            <input {...register(value, { required })} type={type} />
        </label>
    )
}

export default Input
