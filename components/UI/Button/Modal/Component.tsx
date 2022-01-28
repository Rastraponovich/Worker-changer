import React, { FC } from "react"
interface InputProps {
    onClick?: () => void
}
const MyCompBlank: FC<InputProps> = () => {
    return <div></div>
}

const MyComp = MyCompBlank

export { MyComp }
