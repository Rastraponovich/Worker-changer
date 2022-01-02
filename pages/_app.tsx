import "@/styles/globals.css"
import type { AppProps } from "next/app"
import React, { FC, useEffect } from "react"
import { fork, Scope, serialize } from "effector"
import { Provider } from "effector-react/scope"

let clientScope: Scope

const APP: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    const scope = fork({
        values: {
            ...(clientScope && serialize(clientScope)),
            ...pageProps.initialState,
        },
    })
    if (typeof window !== "undefined") clientScope = scope

    useEffect(() => {
        if (typeof window !== "undefined") {
            // const attachLogger = require("effector-logger/attach").attachLogger
            // attachLogger(null, scope)
        }
    }, [])
    return (
        <Provider value={scope}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default APP
