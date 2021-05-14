import React from "react"
import styles from "@/styles/Home.module.css"
import { IWorker } from "@/types/types"

interface InputProps extends IWorker {}

const WorkerCard: React.FC<InputProps> = ({
    genTaxPayerIdNum,
    Code,
    Ident,
    Name,
    OfficialName,
    Status,
    GUIDString,
}) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{Name}</h3>
            <span className={styles.cardText}>
                ФИО и должность: {OfficialName}
            </span>
            <span className={styles.cardText}>ИНН: {genTaxPayerIdNum}</span>
        </div>
    )
}

export default WorkerCard
