import React, { FC, memo } from "react"
import { IStatus } from "interfaces/types"
import Link from "next/link"
import { useStore } from "effector-react"
import { $status } from "features/initialApp"
interface HeaderProps {
    title?: string
}

const Header: FC<HeaderProps> = ({ title }) => {
    const status = useStore($status)

    return (
        <header className="flex justify-between px-8 py-4 shadow-lg items-center bg-sky-900 text-white text-base">
            <Link href="/">
                <a className="font-bold  text-2xl">
                    {title ? title : "Настройка кассиров"}
                </a>
            </Link>

            <div className="bulk"></div>
            <span>Статус сервера: {status?.Status}</span>
        </header>
    )
}

export default memo(Header)
