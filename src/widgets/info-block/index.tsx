import React, { FC, memo } from "react"
import styles from "@/styles/InfoBlock.module.css"

export const InfoBlock = () => {
    return (
        <section>
            <ul className="text list-decimal space-y-1 rounded bg-sky-900   px-8 py-2 text-base text-white shadow-md">
                <li>Выберите кассира из выпадающего списка</li>
                <li>После выбора нажмите изменить</li>
                <li>Текущий кассир в списке отражен курсивом</li>
            </ul>
        </section>
    )
}
