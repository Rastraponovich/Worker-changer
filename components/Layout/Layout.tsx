import Head from "next/head"
import { useRouter } from "next/router"
import React, { FC } from "react"
import styles from "../../styles/Home.module.css"
import Header from "../Header/Header"
interface LayoutInputProps {
    serverState?: boolean
    children: any
}
const Layout: FC<LayoutInputProps> = ({ serverState, children }) => {
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
        </div>
    )
}

export default Layout
