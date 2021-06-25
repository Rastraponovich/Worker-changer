import "@/styles/globals.css"
import { ThingsProvider } from "@/components/App/ThingsContext"
import { AppProps } from "next/dist/next-server/lib/router/router"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThingsProvider value={{}}>
            <Component {...pageProps} />
        </ThingsProvider>
    )
}

export default MyApp
