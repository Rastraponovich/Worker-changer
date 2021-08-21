import React, { FC, memo, useCallback } from "react"

import CashierList from "@/components/CashierList/CashierList"
import styles from "@/styles/CashiersBlock.module.css"
import Modal from "../UI/Modal/Modal"
import { useTypeSelector } from "@/hooks/useTypeSelector"
import { useStore } from "react-redux"
import { NextThunkDispatch } from "store"
import { closeModalAction } from "store/actions/workersActions"
interface InputProps {}

const CashiersBlock: FC<InputProps> = () => {
    const { isOpenModal, workerInfo, workers, loading } = useTypeSelector(
        (store) => store.workersStore
    )

    const dispatch = useStore().dispatch as NextThunkDispatch

    const handleOpenModal = useCallback(async () => {
        await dispatch(await closeModalAction())
    }, [isOpenModal])

    return (
        <>
            <section className={styles.section}>
                {workers.length > 0 ? (
                    <CashierList />
                ) : (
                    <h2 className={styles.statusText}>
                        Опачки.. кажись словил маслину
                    </h2>
                )}
                <div className="bulk" />
            </section>
            <Modal autoClose={2000}>
                <p>{workerInfo.OfficialName}</p>
                <button
                    className={styles.modalButton}
                    onClick={handleOpenModal}
                >
                    Продолжить
                </button>
            </Modal>
        </>
    )
}

export default memo(CashiersBlock)
