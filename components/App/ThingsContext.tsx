import React from "react"

const footer = {
    light: {
        backgroundColor: "transparent",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        color: " #000",
    },
    dark: {
        backgroundColor: "#293048",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        color: " #fff",
    },
}
const header = {
    light: {
        display: "flex",
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        color: "#000",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dark: {
        display: "flex",
        color: "#fff",
        padding: "1rem 2rem",
        backgroundColor: "#293048",
        justifyContent: "space-between",
        alignItems: "center",
    },
}
const body = {
    light: {},
    dark: {},
}
type TMode = "light" | "dark"

interface ITheme {
    mode: TMode
    light: { [key: string]: string | {} }
    dark: { [key: string]: string | {} }
}
export interface IContextTheme {
    theme: any
    mode: TMode
    toggleTheme: () => void
}

const theme: ITheme = {
    mode: "dark",
    light: {
        bg: "#fff",
        palette: {},
        footer: footer.light,
        header: header.light,
        body: body.light,
        title: {},
    },
    dark: {
        bg: "#000",
        palette: {},
        title: {},
        footer: footer.dark,
        header: header.dark,
        body: body.dark,
    },
}

export const Context: IContextTheme = {
    theme: theme[theme.mode],
    mode: theme.mode,
    toggleTheme: () => {
        theme.mode = theme.mode === "dark" ? "light" : "dark"
        Context.mode = theme.mode
        Context.theme = theme[theme.mode]
    },
}

const ThingsContext = React.createContext(Context)

export const ThingsProvider = ThingsContext.Provider

export default ThingsContext
