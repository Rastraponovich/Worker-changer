import "../styles/globals.css"
import { ThingsProvider } from "../components/App/ThingsContext"
function MyApp({ Component, pageProps }) {
    return (
        <ThingsProvider value={{}}>
            <Component {...pageProps} />
        </ThingsProvider>
    )
}

export default MyApp
