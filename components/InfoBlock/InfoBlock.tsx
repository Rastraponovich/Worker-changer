import React, { FC, memo } from "react"

interface InputProps {
    styles: { readonly [key: string]: string }
    show: boolean
}

const InfoBlock: FC<InputProps> = ({ styles, show }) => {
    return (
        <section>
            {show ? (
                <ul className={styles.info}>
                    <li>Выберите кассира из выпадающего списка</li>
                    <li>После выбора нажмите изменить</li>
                    <li>текущий кассир в списке отражен курсивом</li>
                </ul>
            ) : null}
        </section>
    )
}

export default memo(InfoBlock)
