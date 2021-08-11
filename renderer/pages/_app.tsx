import "@/styles/globals.css"
import { Context, ThingsProvider } from "@/components/App/ThingsContext"
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import { NextThunkDispatch, wrapper } from "../store"
import React, { FC, useState } from "react"

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThingsProvider value={Context}>
            <Component {...pageProps} />
        </ThingsProvider>
    )
}

export default wrapper.withRedux(WrappedApp)
