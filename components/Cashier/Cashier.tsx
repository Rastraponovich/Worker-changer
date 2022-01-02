import React, { ChangeEvent, FC, memo, useEffect, useState } from "react"
import { IWorker } from "interfaces/types"

import Select from "../UI/Select/Select"
import clsx from "clsx"
import { $employeesArray, refreshIPWorker } from "features/workers"
import { useEvent, useList, useStore } from "effector-react"
import { Event, Store } from "effector"

interface CashierProps {
    worker: Store<IWorker>
    selectedWorker?: Store<IWorker>
    title: string
    change: Event<ChangeEvent<HTMLSelectElement>>
    onSave: Event<void>
}

const Cashier: FC<CashierProps> = (props) => {
    const { title, change } = props

    const worker = useStore(props.worker)
    const selectedWorker = useStore(props.selectedWorker)

    const onSave = useEvent(props.onSave)

    const handleSelectWorker = useEvent(change)

    const handleRefresh = useEvent(refreshIPWorker)

    const handleSave = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSave()
    }

    const handleGetInfo = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        handleRefresh()
    }

    return (
        <form
            onSubmit={handleSave}
            className={clsx(
                "text-base space-y-4 m-4 bg-sky-900 shadow-lg flex flex-col p-4 rounded"
            )}
        >
            <div className="flex  justify-between items-center">
                <h3> Кассир: {title}</h3>
                <button
                    className="px-4 py-2 rounded border-white border uppercase"
                    onClick={handleGetInfo}
                >
                    Обновить
                </button>
            </div>
            <div className="space-y-2 flex flex-col">
                <span>ФИО: {worker.OfficialName}</span>
                <span>ИНН: {worker.genTaxPayerIdNum}</span>
                {worker.genTaxPayerIdNum !==
                    selectedWorker.genTaxPayerIdNum && (
                    <div className="px-2 py-4 border border-white space-y-2 flex flex-col">
                        <h3>Кассир поменяется на:</h3>
                        <span>ФИО: {selectedWorker.OfficialName}</span>
                        <span>ИНН: {selectedWorker.genTaxPayerIdNum}</span>
                    </div>
                )}
                <Select onChange={handleSelectWorker}>
                    {useList($employeesArray, {
                        keys: [selectedWorker],
                        fn: (empItem: IWorker) => (
                            <option
                                key={empItem.GUIDString}
                                value={empItem.GUIDString}
                                className={clsx(
                                    worker.genTaxPayerIdNum ===
                                        empItem.genTaxPayerIdNum &&
                                        worker.OfficialName ===
                                            empItem.OfficialName &&
                                        "bg-sky-900 italic text-yellow-300"
                                )}
                            >
                                {empItem.OfficialName} :{" "}
                                {empItem.genTaxPayerIdNum}
                            </option>
                        ),
                    })}
                </Select>
            </div>

            {worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum && (
                <button
                    type="submit"
                    className={clsx(
                        "hover:bg-sky-900 hover:text-white hover:border-white",
                        "transiton-all duration-150 cursor-pointer flex justify-center items-center bg-white text-sky-900 px-4 py-2 outline-none rounded border-2 border-transparent "
                    )}
                >
                    Изменить
                </button>
            )}
        </form>
    )
}

export default memo(Cashier)
