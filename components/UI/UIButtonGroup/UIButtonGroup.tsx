import React, { memo, FC, ReactNode } from "react"

interface InputProps {
    children: ReactNode
}

const UIButtonGroup: FC<InputProps> = ({ children }) => {
    return <div style={{ display: "flex" }}>{children}</div>
}

export default memo(UIButtonGroup)
