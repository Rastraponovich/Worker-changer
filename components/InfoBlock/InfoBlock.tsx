import React, { FC, memo } from "react"
import styles from "@/styles/InfoBlock.module.css"

interface InputProps {
    loading: boolean
}
const InfoBlock: FC<InputProps> = ({ loading }) => {
    return (
        <>
            {loading ? null : (
                <section>
                    <ul className={styles.info}>
                        <li>Выберите кассира из выпадающего списка</li>
                        <li>После выбора нажмите изменить</li>
                        <li>текущий кассир в списке отражен курсивом</li>
                    </ul>
                </section>
            )}
        </>
    )
}

export default memo(InfoBlock)
