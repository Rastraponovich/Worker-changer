import React, { FC, memo, useEffect, useState } from "react"
import { IWorker } from "@/types/types"
import styles from "@/styles/Cashier.module.css"

import axios from "axios"

interface InputProps {
    worker: IWorker
    selectedWorker?: IWorker
    title: string
    employeesArray: IWorker[]
    change: Function
    type: string
    onSave: Function
    showModal: Function
}

const CashierCard: FC<InputProps> = (props) => {
    const {
        worker,
        title,
        employeesArray,
        selectedWorker,
        change,
        type,
        onSave,
        showModal,
    } = props
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSave(selectedWorker, type)
    }

    const [diff, setDiff] = useState(false)

    useEffect(() => {
        if (worker.Ident !== selectedWorker.Ident) {
            setDiff(true)
        } else {
            setDiff(false)
        }
    }, [selectedWorker])

    useEffect(() => {
        if (selectedWorker.Code == null) {
            setDiff(false)
        }
    }, [selectedWorker])

    const handleGetInfo = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        const result = await axios.get(
            `/api/workers/getbyid?guid=${worker.GUIDString}`
        )
        const officialName =
            result.data.RK7Reference.Items[0].Item[0].OfficialName
        const inn = result.data.RK7Reference.Items[0].Item[0].genTaxPayerIdNum
        const text = officialName + " " + inn
        showModal(text, "getinfo")
    }

    return (
        <form className={styles.form}>
            <div className={styles.header}>
                <h3>Кассир {title}</h3>
                <button className={styles.infoButton} onClick={handleGetInfo}>
                    обновить
                </button>
            </div>
            <span>ФИО: {worker.OfficialName}</span>
            <span>ИНН: {worker.genTaxPayerIdNum}</span>
            <hr />
            {diff ? (
                <div className={styles.inform}>
                    <h3>Кассир поменяется на:</h3>
                    <span>ФИО: {selectedWorker.OfficialName}</span>
                    <span>ИНН: {selectedWorker.genTaxPayerIdNum}</span>
                </div>
            ) : null}
            <select
                id={type}
                onChange={(e) => change(e)}
                className={styles.input}
            >
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
            </select>
            {diff ? (
                <button onClick={handleSave} className={styles.submit}>
                    Изменить
                </button>
            ) : null}
        </form>
    )
}

export default memo(CashierCard)
