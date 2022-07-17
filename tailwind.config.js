module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Montserrat: "'Montserrat', sans-serif",
                Rubik: "'Rubik', sans-serif",
                RobotoMono: "'Roboto Mono', monospace",
                IBMPlexSans: "'IBM Plex Sans', sans-serif",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: false,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
    },
}
