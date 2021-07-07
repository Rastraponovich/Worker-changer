import Head from "next/head"
import React, { FC, memo } from "react"

import styles from "@/styles/Home.module.css"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { IStatus } from "@/types/types"

interface InputProps {
    serverState?: boolean
    children: any
    status?: IStatus
}
const Layout: FC<InputProps> = ({ serverState, children, status }) => {
    return (
        <>
            <Head>
                <title>WorkerChanger</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header serverState={serverState} />
            <main className={styles.main}>{children}</main>
            <div className="bulk"></div>
            <Footer status={status} />
        </>
    )
}

export default memo(Layout)
