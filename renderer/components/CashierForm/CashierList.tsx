import React, { FC, memo, useCallback, useMemo, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

import { IWorker, IWorkerChangeRespose } from "@/types/types"

import Cashier from "../CashierCard/CashierCard"
import styles from "@/styles/CashierList.module.css"

interface InputProps {
    workers: IWorker[]
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

const CashierList: FC<InputProps> = ({ workers, showModal }) => {
    const workerOOO = useMemo(
        () => workers.find((item) => item.Name === "Кассир ООО"),
        [workers]
    )
    const workerIP = useMemo(
        () => workers.find((item) => item.Name === "Кассир ИП"),
        [workers]
    )

    const [newIP, setNewIP] = useState<IWorker>(workerIP)
    const [newOOO, setNewOOO] = useState<IWorker>(workerOOO)

    const employeesArray = useMemo(
        () =>
            workers.filter(
                (item) =>
                    item.Name !== "Кассир ИП" && item.Name !== "Кассир ООО"
            ),
        [workers]
    )

    const handleChange = useCallback((event: any) => {
        const { id, value } = event.target
        const worker = employeesArray.find(
            (workerItem) => value === workerItem.GUIDString
        )
        if (id === "OOO") {
            if (worker) {
                setNewOOO({ ...worker, GUIDString: workerOOO.GUIDString })
            } else {
                setNewOOO(workerOOO)
            }
        }
        if (id === "IP") {
            if (worker) {
                setNewIP({ ...worker, GUIDString: workerIP.GUIDString })
            } else {
                setNewIP(workerIP)
            }
        }
    }, [])

    const handleSave = useCallback(async (worker: IWorker, type: string) => {
        const result: {
            data: IWorkerChangeRespose
        } = await axios.post("/api/setworker", { worker })

        if (!result.data.error) {
            showModal(`Кассир ${type} изменен. Перезагрузите страницу`, "set")
            if (type === "OOO") {
                setNewOOO(bulkWorker)
            }
            if (type === "IP") {
                setNewIP(bulkWorker)
            }
        } else {
            showModal(
                `Произошла ошибка! Кассир ${type} неизменен. Перезагрузите страницу`,
                "set"
            )
        }
    }, [])

    return (
        <div className={styles.formWrapper}>
            <Cashier
                title="ИП"
                employeesArray={employeesArray}
                selectedWorker={newIP}
                change={handleChange}
                worker={workerIP}
                type="IP"
                onSave={handleSave}
                showModal={showModal}
            />
            <Cashier
                title="ООО"
                employeesArray={employeesArray}
                selectedWorker={newOOO}
                change={handleChange}
                worker={workerOOO}
                type="OOO"
                onSave={handleSave}
                showModal={showModal}
            />
        </div>
    )
}

export default memo(CashierList)
