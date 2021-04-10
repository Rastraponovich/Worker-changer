import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import styles from "../../styles/Home.module.css"
import Header from "../Header/Header"

const Layout = ({ children }) => {
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>WorkerChanger</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.container}>
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    )
}

export default Layout
