import React, { FC, ReactNode, useEffect, useState } from "react"
import styles from "@/styles/Modal.module.css"
import { memo } from "react"

interface InputProps {
    show: boolean
    autoClose?: number
    onClose?: () => void
    children: ReactNode
}

const Modal: FC<InputProps> = ({ children, show, onClose, autoClose }) => {
    const [open, setOpen] = useState(show)

    useEffect(() => {
        if (autoClose) {
            setOpen(show)

            setTimeout(() => {
                setOpen(!show)
            }, autoClose)
        } else {
            setOpen(show)
        }
    }, [show])

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault()
    //     onClose()
    // }

    const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        onClose()
    }
    return (
        <div
            className={styles.wrapper}
            style={{ display: !open ? "none" : "inherit" }}
            onClick={handleClose}
        >
            <div className={styles.fade}></div>
            <div className={styles.content}>
                {children}
                {/* <p>{text}</p>
                <button className={styles.modalButton} onClick={handleClick}>
                    {ButtonType[type]}
                </button> */}
            </div>
        </div>
    )
}

export default memo(Modal)
