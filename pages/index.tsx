import axios from "axios"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"

import { InputProps, IWorker } from "@/types/types"
import { useParser } from "@/hooks/usePareser"
import { sendData } from "@/hooks/useGetData"

import Layout from "@/components/Layout/Layout"
import CashierForm from "@/components/CashierForm/CashierForm"
import Modal from "@/components/Modal/Modal"
import NoData from "@/components/NoData/NoData"

import styles from "@/styles/Home.module.css"
import { getEmployees } from "schemas/schema"

const Home: React.FC<InputProps> = ({ workers, status, commandResult }) => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [serverState, setServerState] = useState(status.Status === "Ok")

    useEffect(() => {
        setInterval(() => {
            axios.get("/api/getStatus").then((data) => {
                if (data.data?.commandResult?.Status === "Ok") {
                    setServerState(true)
                } else {
                    setServerState(false)
                }
            })
        }, 30000)
    }, [status])

    const handleShowModal = (text: string, type: string) => {
        setModalMessage(text)
        setShowModal(!showModal)
    }

    const handleClick = () => {
        setModalMessage("")
        setShowModal(false)
        router.reload()
    }

    const handleOpenModal = () => {
        setModalMessage("")
        setShowModal(!showModal)
    }
    return (
        <Layout serverState={serverState}>
            <section>
                <ul className={styles.info}>
                    <li>Выберите кассира из выпадающего списка</li>
                    <li>После выбора нажмите изменить</li>
                    <li>текущий кассир в списке отражен курсивом</li>
                </ul>
            </section>
            <section className={styles.section}>
                <div className={styles.titleBlock}>
                    <h1 className={styles.title}>Настройка кассиров</h1>
                    <span
                        className={
                            serverState
                                ? styles.circleActive
                                : styles.circleInActive
                        }
                    ></span>
                </div>
                {serverState ? (
                    <CashierForm
                        workers={workers}
                        showModal={handleShowModal}
                        serverState={serverState}
                    />
                ) : (
                    <NoData />
                )}
                <div className="bulk" />
            </section>
            <Modal show={showModal} onClose={handleOpenModal}>
                <p>{modalMessage}</p>
                <button className={styles.modalButton} onClick={handleClick}>
                    Продолжить
                </button>
            </Modal>
        </Layout>
    )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const schema = getEmployees()

    const res = await sendData(schema)
    const response = useParser(res)

    if (response?.RK7QueryResult) {
        const { CommandResult, ...status } = response.RK7QueryResult[0]
        const {
            SourceCommand,
            RK7Reference,
            ...commandResult
        } = CommandResult[0]

        const workers: IWorker[] = RK7Reference[0].Items[0].Item.filter(
            (worker: IWorker) => worker.Status !== "rsDeleted"
        )

        return {
            props: {
                workers,
                status,
                commandResult,
            },
        }
    } else {
        return {
            props: {
                status: { Status: "no ok" },
            },
        }
    }
}
