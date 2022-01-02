import React, { FC, memo } from "react"
import styles from "@/styles/InfoBlock.module.css"

interface InputProps {}
const InfoBlock: FC<InputProps> = () => {
    return (
        <section>
            <ul className="text text-white text-base space-y-1 rounded   px-8 py-2 list-decimal shadow-md bg-sky-900">
                <li>Выберите кассира из выпадающего списка</li>
                <li>После выбора нажмите изменить</li>
                <li>Текущий кассир в списке отражен курсивом</li>
            </ul>
        </section>
    )
}

export default memo(InfoBlock)
