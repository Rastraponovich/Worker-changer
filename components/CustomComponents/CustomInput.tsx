import { Event } from "effector"
import { useEvent } from "effector-react"
import React, { memo, FC, ChangeEvent, HTMLInputTypeAttribute } from "react"

interface CustomInputProps {
    title: string
    value: any
    onChange?: Event<ChangeEvent<HTMLInputElement>>
    type?: HTMLInputTypeAttribute
    className?: string
    labelClassName?: string
    titleClassName?: string
    name?: string
    disabled?: boolean
}
const CustomInput: FC<CustomInputProps> = ({
    title,
    value,
    onChange,
    type = "text",
    className,
    labelClassName,
    titleClassName,
    name,
    disabled,
}) => {
    const handleChange = useEvent(onChange)

    return (
        <label className={labelClassName}>
            <span className={titleClassName}>{title}</span>
            <input
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                className={className}
                disabled={disabled}
            />
        </label>
    )
}

export default memo(CustomInput)
