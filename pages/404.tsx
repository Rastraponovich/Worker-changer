import { NextPage } from "next"
import React from "react"

const Page404: NextPage = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                height: "100vh",
            }}
        >
            <h1>Ошибка 404</h1>
            <p>Страница не найдена. Свяжитесь +79182086821</p>
        </div>
    )
}

export default Page404