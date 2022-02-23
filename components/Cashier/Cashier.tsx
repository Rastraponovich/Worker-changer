import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react"
import { IWorker } from "interfaces/types"

import Select from "../UI/Select/Select"
import clsx from "clsx"
import { $employeesArray } from "features/workers"
import { useEvent, useList, useStore } from "effector-react"
import { Event, Store } from "effector"
import Button from "../UI/Button/Button"
import { WorkerProps } from "features/workers/types"

interface CashierProps {
    workerProps: WorkerProps
    title: string
}

const Cashier = (props: CashierProps) => {
    const { title, workerProps } = props
    const {
        $currentWorker,
        $getWorkerPending,
        $saveWorkerPending,
        saveWorker,
        selectWorker,
        $newWorker,
        refreshWorker,
    } = workerProps

    const worker = useStore($currentWorker)
    const selectedWorker = useStore($newWorker)
    const refreshPending = useStore($getWorkerPending)
    const pending = useStore($saveWorkerPending)

    const handleSaveWorker = useEvent(saveWorker)
    const handleSelectWorker = useEvent(selectWorker)
    const handleRefresh = useEvent(refreshWorker)

    const handleSave = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleSaveWorker()
    }

    const handleGetInfo = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            handleRefresh()
        },
        [worker]
    )

    return (
        <form
            onSubmit={handleSave}
            className={clsx("m-4 flex flex-col justify-between space-y-4 rounded bg-sky-900 p-4 text-base shadow-lg")}
        >
            <div className="flex  items-center justify-between">
                <h3 className="text-xl font-semibold"> Кассир: {title}</h3>
                <Button onClick={handleGetInfo} pending={refreshPending}>
                    Обновить
                </Button>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-7 items-center justify-center text-sm">
                    <span className="col-span-3">ФИО: {worker.OfficialName}</span>

                    {worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum && (
                        <>
                            <span className="col-span-1 text-base text-yellow-300">&rarr;</span>
                            <span className="col-span-3 text-right italic text-yellow-300">
                                {selectedWorker.OfficialName}
                            </span>
                        </>
                    )}
                </div>
                <div className="grid grid-cols-7 items-center justify-center text-sm">
                    <span className="col-span-3">ИНН: {worker.genTaxPayerIdNum}</span>

                    {worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum && (
                        <>
                            <span className="col-span-1 text-base text-yellow-300">&rarr;</span>

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
                                    worker.genTaxPayerIdNum === empItem.genTaxPayerIdNum &&
                                        worker.OfficialName === empItem.OfficialName &&
                                        "bg-sky-900 italic text-yellow-300"
                                )}
                            >
                                {empItem.OfficialName} : {empItem.genTaxPayerIdNum}
                            </option>
                        ),
                    })}
                </Select>
            </div>

            {worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum && (
                <Button type="submit" className="bg-white text-sky-900" pending={pending}>
                    Изменить
                </Button>
            )}
        </form>
    )
}

export default memo(Cashier)
