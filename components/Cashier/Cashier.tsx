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
                "m-4 flex flex-col justify-between space-y-4 rounded bg-sky-900 p-4 text-base shadow-lg"
            )}
        >
            <div className="flex  items-center justify-between">
                <h3 className="text-xl font-semibold"> Кассир: {title}</h3>
                <button
                    className="rounded border border-white px-4 py-2 uppercase hover:bg-white hover:text-sky-900"
                    onClick={handleGetInfo}
                >
                    Обновить
                </button>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-7 items-center justify-center text-sm">
                    <span className="col-span-3">
                        ФИО: {worker.OfficialName}
                    </span>

                    {worker.genTaxPayerIdNum !==
                        selectedWorker.genTaxPayerIdNum && (
                        <>
                            <span className="col-span-1 text-base text-yellow-300">
                                &rarr;
                            </span>
                            <span className="col-span-3 text-right italic text-yellow-300">
                                {selectedWorker.OfficialName}
                            </span>
                        </>
                    )}
                </div>
                <div className="grid grid-cols-7 items-center justify-center text-sm">
                    <span className="col-span-3">
                        ИНН: {worker.genTaxPayerIdNum}
                    </span>

                    {worker.genTaxPayerIdNum !==
                        selectedWorker.genTaxPayerIdNum && (
                        <>
                            <span className="col-span-1 text-base text-yellow-300">
                                &rarr;
                            </span>

                            <span className="col-span-3 text-right italic text-yellow-300">
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
                        "hover:border-white hover:bg-sky-900 hover:text-white",
                        "transiton-all flex cursor-pointer items-center justify-center rounded border-2 border-transparent bg-white px-4 py-2 text-sky-900 outline-none duration-150 "
                    )}
                >
                    Изменить
                </button>
            )}
        </form>
    )
}

export default memo(Cashier)
