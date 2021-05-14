import React, { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"

interface InputProps {
    show: boolean
    autoClose?: number
    onClose?: Function
}

const Modal: React.FC<InputProps> = ({
    children,
    show,
    onClose,
    autoClose,
}) => {
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
        // event.preventDefault()
        event.stopPropagation()
        onClose()
    }
    return (
        <div
            className={styles.modal}
            style={{ display: !open ? "none" : "inherit" }}
            onClick={handleClose}
        >
            <div className={styles.modalWrapper}></div>
            <div className={styles.modalTextBlock}>
                {children}
                {/* <p>{text}</p>
                <button className={styles.modalButton} onClick={handleClick}>
                    {ButtonType[type]}
                </button> */}
            </div>
        </div>
    )
}

export default Modal
