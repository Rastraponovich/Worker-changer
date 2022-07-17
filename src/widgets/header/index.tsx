import React, { memo } from "react"
import Link from "next/link"
import { useStore } from "effector-react"
import { $status } from "features/initialApp"
interface HeaderProps {
    title?: string
}

export const Header = memo(({ title }: HeaderProps) => {
    const status = useStore($status)

    return (
        <header className="flex items-center justify-between bg-sky-900 px-8 py-4 text-base text-white shadow-lg">
            <Link href="/">
                <a className="text-2xl  font-bold">{title ? title : "Настройка кассиров"}</a>
            </Link>

            <div className="bulk"></div>
            <span>Статус сервера: {status?.Status}</span>
        </header>
    )
})
