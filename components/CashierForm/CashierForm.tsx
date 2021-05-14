import React, { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

import { IWorker, IWorkerChangeRespose } from "@/types/types"

import Cashier from "./Cashier"
import styles from "@/styles/Home.module.css"

interface InputProps {
    workers: IWorker[]
    serverState: boolean
    showModal: Function
}

const bulkWorker: IWorker = {
    genTaxPayerIdNum: null,
    Code: null,
    Ident: null,
    Name: "",
    OfficialName: "",
    Status: "",
    GUIDString: "",
}

const CashierForm: React.FC<InputProps> = ({
    workers,
    showModal,
    serverState,
}) => {
    const router = useRouter()
    const [workerOOO, setWorkerOOO] = useState(
        workers.find((item) => item.Name === "Кассир ООО")
    )
    const [workerIP, setWorkerIP] = useState(
        workers.find((item) => item.Name === "Кассир ИП")
    )

    const [newIP, setNewIP] = useState(bulkWorker)
    const [newOOO, setNewOOO] = useState(bulkWorker)

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
        // console.log(worker)
        if (id === "OOO") {
            if (worker) {
                setNewOOO({ ...worker, GUIDString: workerOOO.GUIDString })
            } else {
                setNewOOO(bulkWorker)
            }
        }
        if (id === "IP") {
            if (worker) {
                setNewIP({ ...worker, GUIDString: workerIP.GUIDString })
            } else {
                setNewIP(bulkWorker)
            }
        }
    }

    const handleSave = async (worker: IWorker, type: string) => {
        const result: {
            data: IWorkerChangeRespose
        } = await axios.post("/api/setworker", { worker })

        if (result.data.commandResult.Status === "Ok") {
            showModal(
                `Кассир ${type} изменен. Перезагрузите страницу`,
                "refresh"
            )
            if (type === "OOO") {
                setNewOOO(bulkWorker)
            }
            if (type === "IP") {
                setNewIP(bulkWorker)
            }
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
                data={newIP}
                change={handleChange}
                worker={workerIP}
                type="IP"
                onSave={handleSave}
                showModal={showModal}
                serverState={serverState}
            />
            <Cashier
                title="ООО"
                emp={emp}
                data={newOOO}
                change={handleChange}
                worker={workerOOO}
                type="OOO"
                onSave={handleSave}
                showModal={showModal}
                serverState={serverState}
            />
        </div>
    )
}

export default CashierForm
