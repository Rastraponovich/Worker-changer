import "@/styles/globals.css"
import { Context, ThingsProvider } from "@/components/App/ThingsContext"
import { AppProps } from "next/dist/next-server/lib/router/router"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThingsProvider value={Context}>
            <Component {...pageProps} />
        </ThingsProvider>
    )
}

export default MyApp
