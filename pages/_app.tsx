import "@/styles/globals.css"
import { Context, ThingsProvider } from "@/components/App/ThingsContext"
import type { AppProps } from "next/app"
import { wrapper } from "../store"
import React, { FC } from "react"

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    return (
        <ThingsProvider value={Context}>
            <Component {...pageProps} />
        </ThingsProvider>
    )
}

export default wrapper.withRedux(WrappedApp)
