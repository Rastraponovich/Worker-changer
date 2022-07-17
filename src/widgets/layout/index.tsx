import Head from "next/head"

import { getStatus } from "features/initialApp"
import { useEvent } from "effector-react"
import { ReactNode, memo, useEffect } from "react"
import { Header } from "src/widgets/header"
import { Footer } from "src/widgets/footer"

interface LayoutProps {
    children: ReactNode
    title?: string
}
export const Layout = memo(({ children, title }: LayoutProps) => {
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
            <main className="flex flex-col items-center p-4">{children}</main>
            <div className="grow"></div>
            <Footer />
        </>
    )
})
Layout.displayName = "Layout"
