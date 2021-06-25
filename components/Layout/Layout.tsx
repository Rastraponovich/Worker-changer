import Head from "next/head"
import React, { FC } from "react"

import styles from "@/styles/Home.module.css"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { IStatus } from "@/types/types"

interface LayoutInputProps {
    serverState?: boolean
    children: any
    status?: IStatus
}
const Layout: FC<LayoutInputProps> = ({ serverState, children, status }) => {
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>WorkerChanger</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header serverState={serverState} />
            <div className={styles.container}>
                <main className={styles.main}>{children}</main>
            </div>
            <Footer status={status} />
        </div>
    )
}

export default Layout
