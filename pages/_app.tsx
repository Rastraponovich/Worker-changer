import "@/styles/globals.css"
import { Scope, fork, serialize } from "effector"
import { Provider } from "effector-react/scope"
import type { AppProps } from "next/app"

let clientScope: Scope

const APP = ({ Component, pageProps }: AppProps) => {
    const scope = fork({
        values: {
            ...(clientScope && serialize(clientScope)),
            ...pageProps.initialState,
        },
    })
    if (typeof window !== "undefined") clientScope = scope

    return (
        <Provider value={scope}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default APP
