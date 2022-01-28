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
                "text-base space-y-4 m-4 bg-sky-900 shadow-lg flex flex-col p-4 rounded justify-between"
            )}
        >
            <div className="flex  justify-between items-center">
                <h3 className="text-xl font-semibold"> Кассир: {title}</h3>
                <button
                    className="px-4 py-2 rounded border-white border uppercase"
                    onClick={handleGetInfo}
                >
                    Обновить
                </button>
            </div>
            <div className="space-y-2 flex flex-col">
                <div className="text-sm grid grid-cols-7 justify-center items-center">
                    <span className="col-span-3">
                        ФИО: {worker.OfficialName}
                    </span>

                    {worker.genTaxPayerIdNum !==
                        selectedWorker.genTaxPayerIdNum && (
                        <>
                            <span className="text-base text-yellow-300 col-span-1">
                                &rarr;
                            </span>
                            <span className="text-yellow-300 italic text-right col-span-3">
                                {selectedWorker.OfficialName}
                            </span>
                        </>
                    )}
                </div>
                <div className="text-sm grid grid-cols-7 justify-center items-center">
                    <span className="col-span-3">
                        ИНН: {worker.genTaxPayerIdNum}
                    </span>

                    {worker.genTaxPayerIdNum !==
                        selectedWorker.genTaxPayerIdNum && (
                        <>
                            <span className="text-base text-yellow-300 col-span-1">
                                &rarr;
                            </span>

                            <span className="text-yellow-300 italic text-right col-span-3">
                                {selectedWorker.genTaxPayerIdNum}
                            </span>
                        </>
                    )}
                </div>
                <div className="grow"></div>
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
