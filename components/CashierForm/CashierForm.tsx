import React, { useState } from "react"
import { IWorker, IWorkerChangeRespose } from "../../types/types"
import styles from "../../styles/Home.module.css"
import Cashier from "./Cashier"
import axios from "axios"
import { useRouter } from "next/router"

interface InputProps {
    workers: IWorker[]
    showModal: Function
}

const CashierForm: React.FC<InputProps> = ({ workers, showModal }) => {
    const router = useRouter()
    const [workerOOO, setWorkerOOO] = useState(
        workers.find((item) => item.Name === "Кассир ООО")
    )

    const [parentIP, setParentIP] = useState(
        workers.find((item) => item.Name === "Кассир ИП").GUIDString
    )
    const [parentOOO, setParentOOO] = useState(
        workers.find((item) => item.Name === "Кассир ООО").GUIDString
    )

    const [workerIP, setWorkerIP] = useState(
        workers.find((item) => item.Name === "Кассир ИП")
    )

    const [emp, setEmp] = useState(
        workers.filter(
            (item) =>
                item.OfficialName !== "" &&
                item.Name !== "Кассир ИП" &&
                item.Name !== "Кассир ООО" &&
                item.genTaxPayerIdNum.toString.length > 0
        )
    )
    const handleChange = (event: any) => {
        const { id, value } = event.target
        const worker = emp.find((workerItem) => value === workerItem.GUIDString)

        if (id === "OOO") {
            setWorkerOOO({ ...worker, GUIDString: workerOOO.GUIDString })
        } else {
            setWorkerIP({ ...worker, GUIDString: workerIP.GUIDString })
        }
    }

    const handleSave = async (type: string) => {
        let worker: IWorker = workerIP

        if (type === "OOO") {
            worker = workerOOO
        }

        const result: {
            data: IWorkerChangeRespose
        } = await axios.post("/api/setworker", { worker })

        if (result.data.commandResult.Status === "Ok") {
            showModal(
                `Кассир ${type} изменен. Перезагрузите страницу`,
                "refresh"
            )
        } else {
            showModal(
                `Произошла ошибка! Кассир ${type} неизменен. Перезагрузите страницу`,
                "error"
            )
        }
    }

    return (
        <div className={styles.formWrapper}>
            <Cashier
                title="ИП"
                emp={emp}
                change={handleChange}
                worker={workerIP}
                styles={styles}
                type="IP"
                onSave={handleSave}
                parent={parentIP}
                showModal={showModal}
            />
            <Cashier
                title="ООО"
                emp={emp}
                change={handleChange}
                worker={workerOOO}
                styles={styles}
                type="OOO"
                onSave={handleSave}
                parent={parentOOO}
                showModal={showModal}
            />
        </div>
    )
}

export default CashierForm
