import React, { FC, memo, useCallback, useMemo, useState } from "react"

import { IWorker } from "interfaces/types"

import styles from "@/styles/CashierList.module.css"
import { useStore } from "react-redux"
import { NextThunkDispatch } from "store"
import { useTypeSelector } from "@/hooks/useTypeSelector"
import { saveWorkerAction } from "store/actions/workersActions"
import Card from "../UI/Card/Card"

interface InputProps {}

const CashierList: FC<InputProps> = () => {
    const { workers, currentIPWorker, currentOOOWorker } = useTypeSelector(
        (store) => store.workersStore
    )
    const dispatch = useStore().dispatch as NextThunkDispatch

    const workerOOO = useMemo(() => currentOOOWorker, [currentOOOWorker])
    const workerIP = useMemo(() => currentIPWorker, [currentIPWorker])

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

    const handleChange = useCallback(
        (event: any) => {
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
        },
        [workerOOO, workerIP]
    )

    const handleSave = useCallback(
        async (worker: IWorker) => {
            await dispatch(await saveWorkerAction(worker))
        },
        [currentIPWorker, currentOOOWorker]
    )

    return (
        <div className={styles.formWrapper}>
            <Card
                title="ИП"
                employeesArray={employeesArray}
                selectedWorker={newIP}
                change={handleChange}
                worker={workerIP}
                type="IP"
                onSave={handleSave}
            />
            <Card
                title="ООО"
                employeesArray={employeesArray}
                selectedWorker={newOOO}
                change={handleChange}
                worker={workerOOO}
                type="OOO"
                onSave={handleSave}
            />
        </div>
    )
}

export default memo(CashierList)
