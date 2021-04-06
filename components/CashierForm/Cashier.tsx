import React from "react"
import { IWorker } from "../../types/types"
// import styles from "../../styles/Home.module.css"
import styles from "../../styles/Cashier.module.css"

import axios from "axios"

interface InputProps {
    worker: IWorker
    data?: IWorker
    title: string
    emp: IWorker[]
    change: Function
    type: string
    onSave: Function
    showModal: Function
    serverState: boolean
}

const Cashier: React.FC<InputProps> = (props) => {
    const {
        worker,
        title,
        emp,
        data,
        change,
        type,
        onSave,
        showModal,
        serverState,
    } = props

    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSave(data, type)
    }

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
        showModal(text, "success")
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
            {data.GUIDString.length > 0 ? (
                <div className={styles.inform}>
                    <h3>Кассир поменяется на:</h3>
                    <span>ФИО: {data.OfficialName}</span>
                    <span>ИНН: {data.genTaxPayerIdNum}</span>
                </div>
            ) : null}
            <select
                id={type}
                onChange={(e) => change(e)}
                className={styles.input}
            >
                <option
                    value={worker.GUIDString}
                    className={styles.option}
                    style={{
                        background: "#293048",
                        fontStyle: "italic",
                        color: "#fff",
                    }}
                >
                    {worker.OfficialName} : {worker.genTaxPayerIdNum}
                </option>
                {emp.length > 0
                    ? emp
                          .filter(
                              (item) =>
                                  item.genTaxPayerIdNum !==
                                  worker.genTaxPayerIdNum
                          )
                          .map((empItem: IWorker) => (
                              <option
                                  key={empItem.GUIDString}
                                  value={empItem.GUIDString}
                                  className={styles.option}
                              >
                                  {empItem.OfficialName} :{" "}
                                  {empItem.genTaxPayerIdNum}
                              </option>
                          ))
                    : null}
            </select>
            {serverState ? (
                <button onClick={handleSave} className={styles.submit}>
                    Изменить
                </button>
            ) : null}
        </form>
    )
}

export default React.memo(Cashier)
