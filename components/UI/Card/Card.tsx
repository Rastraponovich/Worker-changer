import React, { ChangeEvent, FC, memo, useEffect, useState } from "react"
import { IWorker } from "interfaces/types"
import styles from "@/styles/Cashier.module.css"

import { getOneWorkerAction } from "store/actions/workersActions"
import { useStore } from "react-redux"
import { NextThunkDispatch } from "store"
import CardTitle from "./CardTitle"
import CardContent from "./CardContent"
import CardActions from "./CardActions"
import Select from "../Select/Select"

interface InputProps {
    worker: IWorker
    selectedWorker?: IWorker
    title: string
    employeesArray: IWorker[]
    change: (e: ChangeEvent<HTMLSelectElement>) => void
    type: string
    onSave: Function
}

const Card: FC<InputProps> = (props) => {
    const {
        worker,
        title,
        employeesArray,
        selectedWorker,
        change,
        type,
        onSave,
    } = props
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSave(selectedWorker)
    }

    const [diff, setDiff] = useState(false)
    const dispatch = useStore().dispatch as NextThunkDispatch

    useEffect(() => {
        if (worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum) {
            setDiff(true)
        } else {
            setDiff(false)
        }
    }, [selectedWorker, worker])

    const handleGetInfo = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        await dispatch(await getOneWorkerAction(worker.GUIDString))
    }

    return (
        <form className={styles.form}>
            <CardTitle title={title} getInfo={handleGetInfo} />
            <CardContent>
                <span>ФИО: {worker.OfficialName}</span>
                <span>ИНН: {worker.genTaxPayerIdNum}</span>
                {diff ? (
                    <div className={styles.inform}>
                        <h3>Кассир поменяется на:</h3>
                        <span>ФИО: {selectedWorker.OfficialName}</span>
                        <span>ИНН: {selectedWorker.genTaxPayerIdNum}</span>
                    </div>
                ) : null}
                <Select type={type} onChange={change}>
                    <option
                        value={worker.GUIDString}
                        className={styles.currentOption}
                    >
                        {worker.OfficialName} : {worker.genTaxPayerIdNum}
                    </option>
                    {employeesArray.length > 0
                        ? employeesArray
                              .filter(
                                  (item) =>
                                      item.genTaxPayerIdNum !==
                                      worker.genTaxPayerIdNum
                              )
                              .map((empItem: IWorker) => (
                                  <option
                                      key={empItem.GUIDString}
                                      value={empItem.GUIDString}
                                  >
                                      {empItem.OfficialName} :{" "}
                                      {empItem.genTaxPayerIdNum}
                                  </option>
                              ))
                        : null}
                </Select>
            </CardContent>

            {diff ? (
                <CardActions>
                    <hr style={{ width: "100%" }} />
                    <button onClick={handleSave} className={styles.submit}>
                        Изменить
                    </button>
                </CardActions>
            ) : null}
        </form>
    )
}

export default memo(Card)
