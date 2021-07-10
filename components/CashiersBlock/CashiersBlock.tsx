import React, { FC, memo, useCallback, useEffect, useState } from "react"

import CashierList from "@/components/CashierForm/CashierList"
import { IStatus, IWorker } from "@/types/types"
import styles from "@/styles/CashiersBlock.module.css"
import Modal from "../UI/Button/Modal/Modal"
import { useRouter } from "next/router"
interface InputProps {
    workers?: IWorker[]
    statusMessage?: string
    status: IStatus
}

type TButtonType = "getinfo" | "get" | "set" | "err"

const CashiersBlock: FC<InputProps> = ({ workers, status, statusMessage }) => {
    const [modalMessage, setModalMessage] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [buttonType, setButtonType] = useState<TButtonType>("getinfo")

    const { reload } = useRouter()
    const handleClick = () => {
        setModalMessage("")
        setShowModal(false)
        if (buttonType === "set") {
            reload()
        }
    }

    const handleOpenModal = useCallback(() => {
        setModalMessage("")
        setShowModal(!showModal)
    }, [showModal])

    const handleShowModal = useCallback(
        (text: string, type: TButtonType = "getinfo") => {
            setModalMessage(text)
            setButtonType(type)
            setShowModal(!showModal)
        },
        [showModal]
    )

    return (
        <>
            <section className={styles.section}>
                {workers.length > 0 ? (
                    <CashierList
                        workers={workers}
                        showModal={handleShowModal}
                    />
                ) : (
                    <h2 className={styles.statusText}>{statusMessage}</h2>
                )}
                <div className="bulk" />
            </section>
            <Modal show={showModal} onClose={handleOpenModal}>
                <p>{modalMessage}</p>
                <button className={styles.modalButton} onClick={handleClick}>
                    Продолжить
                </button>
            </Modal>
        </>
    )
}

export default memo(CashiersBlock)
