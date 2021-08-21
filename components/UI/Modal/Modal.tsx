import React, { FC, ReactNode, useEffect, useState } from "react"
import styles from "@/styles/Modal.module.css"
import { memo } from "react"
import { useTypeSelector } from "@/hooks/useTypeSelector"
import { useStore } from "react-redux"
import { NextThunkDispatch } from "store"
import { closeModalAction } from "store/actions/workersActions"

interface InputProps {
    autoClose?: number
    children: ReactNode
}

const Modal: FC<InputProps> = ({ children, autoClose }) => {
    const { isOpenModal } = useTypeSelector((store) => store.workersStore)

    const dispatch = useStore().dispatch as NextThunkDispatch

    const handleClose = async () => {
        await dispatch(await closeModalAction())
    }

    useEffect(() => {
        if (autoClose && isOpenModal) {
            setTimeout(() => {
                handleClose()
            }, autoClose)
        }
    }, [isOpenModal])

    return (
        <div
            className={styles.wrapper}
            style={{ display: !isOpenModal ? "none" : "inherit" }}
        >
            <div className={styles.fade} onClick={handleClose}></div>
            <div className={styles.content}>{children}</div>
        </div>
    )
}

export default memo(Modal)
