import Head from "next/head"
import React, { FC, memo, useEffect } from "react"

import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { useEvent } from "effector-react/scope"
import { getStatus } from "features/initialApp"

interface LayoutProps {
    children: any
    title?: string
}
const Layout: FC<LayoutProps> = ({ children, title }) => {
    const init = useEvent(getStatus)

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <Head>
                <title>{title ? title : "WorkerChanger"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title={title} />
            <main className="flex flex-col py-4 items-center">{children}</main>
            <div className="grow"></div>
            <Footer />
        </>
    )
}

export default memo(Layout)
