import React from "react"
import { IWorker } from "../../types/types"
import axios from "axios"

interface InputProps {
    styles: { [key: string]: string }
    worker: IWorker
    title: string
    emp: IWorker[]
    change: Function
    type: string
    parent: string
    onSave: Function
    showModal: Function
}

const Cashier: React.FC<InputProps> = (props) => {
    const {
        styles,
        worker,
        title,
        emp,
        change,
        type,
        onSave,
        parent,
        showModal,
    } = props

    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSave(type, parent)
    }

    const handleGetInfo = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        const result = await axios.get(
            `/api/workers/getbyid?guid=${worker.GUIDString}`
        )
        console.log(result.data)
        const officialName =
            result.data.RK7Reference.Items[0].Item[0].OfficialName
        const inn = result.data.RK7Reference.Items[0].Item[0].genTaxPayerIdNum
        const text = officialName + " " + inn
        showModal(text, "success")
    }

    return (
        <form className={styles.cashForm}>
            <div className={styles.cashFormHeder}>
                <h3>Кассир {title}</h3>
                <button className={styles.infoButton} onClick={handleGetInfo}>
                    обновить
                </button>
            </div>
            <span>ФИО: {worker.OfficialName}</span>
            <span>ИНН: {worker.genTaxPayerIdNum}</span>
            <select
                id={type}
                onChange={(e) => change(e)}
                className={styles.input}
            >
                {emp.length > 0
                    ? emp.map((worker: IWorker) => (
                          <option
                              key={worker.GUIDString}
                              value={worker.GUIDString}
                              className={styles.option}
                          >
                              {worker.OfficialName} : {worker.genTaxPayerIdNum}
                          </option>
                      ))
                    : null}
            </select>
            <button onClick={handleSave} className={styles.submit}>
                Изменить
            </button>
        </form>
    )
}

export default React.memo(Cashier)
