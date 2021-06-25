import React, { FC, memo } from "react"
import { css, jsx } from "@emotion/react"
import styled from "@emotion/styled"

type TVariant = "standard" | "outlined" | "contained"
type TSize = "small" | "medium" | "large"
type TColor = "default" | "light" | "dark"

interface InputProps {
    onClick?: () => void
    text: string
    variant?: TVariant
    size?: TSize
    color?: TColor
}

const Button: FC<InputProps> = ({
    onClick,
    text,
    variant = "standard",
    size = "medium",
    color = "default",
}) => {
    const buttonStyle = {
        border: "1px solid black",
        borderRadius: "4px",
        color: "#000",
        padding: "1rem",
        backgroundColor: "transparent",
        cursor: "pointer",
    }

    const Button = styled.button`
        border: 1px solid #fff;
        border-radius: 4px;
        color: #fff;
        background-color: transparent;
        cursor: pointer;
        padding: 0.5rem 1rem;
        &:hover {
            background-color: #fff;
            color: #000;
        }
    `

    return <Button onClick={onClick}>{text}</Button>
}

export default memo(Button)
