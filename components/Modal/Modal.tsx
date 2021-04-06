import React, { useEffect, useState } from "react"
import styles from "../../styles/Home.module.css"

enum ButtonType {
    refresh = "перезагрузить",
    OK = "ок",
    infom = "ок",
    success = "закрыть",
}

interface InputProps {
    text: string
    onClick?: Function
    type: string
    show: boolean
    autoClose?: number
    onClose?: Function
}

const Modal: React.FC<InputProps> = ({
    text,
    onClick,
    type,
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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onClose()
    }

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
                <p>{text}</p>
                <button className={styles.modalButton} onClick={handleClick}>
                    {ButtonType[type]}
                </button>
            </div>
        </div>
    )
}

export default Modal
