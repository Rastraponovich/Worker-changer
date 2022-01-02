import { useStore } from "effector-react"
import { $time } from "features/initialApp"
import React, { memo, FC } from "react"

interface InputProps {}

const Time: FC<InputProps> = () => {
    const time = useStore($time)
    return <span>{time}</span>
}

export default memo(Time)
