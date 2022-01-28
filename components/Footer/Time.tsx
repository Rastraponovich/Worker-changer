import { useStore } from "effector-react"
import { $time } from "features/initialApp"
import React, { memo, FC } from "react"

interface InputProps {}

const Time: FC<InputProps> = () => {
    const time = useStore($time)
<<<<<<< HEAD
    return <span>{time}</span>
=======
    return (
        <span className="col-span-2 lg:col-span-3 justify-self-end">
            {time}
        </span>
    )
>>>>>>> settings
}

export default memo(Time)
