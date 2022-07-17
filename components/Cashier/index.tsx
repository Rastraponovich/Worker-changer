import clsx from "clsx"
import { useStore, useEvent } from "effector-react"
import { memo, ChangeEvent, useCallback } from "react"

import type { WorkerProps } from "features/workers/types"
import type { IWorker } from "src/shared/lib/models"

import { $employeesArray } from "features/workers"

import { SubmitCashier } from "src/features/submit-cashier"
import { RefreshCurrentCashier } from "src/features/refresh-current-cashier/ui"

import { Select } from "src/shared/ui/select"

interface CashierProps {
    workerProps: WorkerProps
    title: string
}

export const Cashier = memo((props: CashierProps) => {
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

    const handleGetInfo = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        handleRefresh()
    }, [])

    const employeesArray = useStore($employeesArray)

    return (
        <form
            onSubmit={handleSave}
            className={clsx("m-4 flex flex-col justify-between space-y-4 rounded bg-sky-900 p-4 text-base shadow-lg")}
        >
            <div className="flex  items-center justify-between">
                <h3 className="text-xl font-semibold"> Кассир: {title}</h3>
                <RefreshCurrentCashier onClick={handleGetInfo} pending={refreshPending} />
            </div>
            <div className="flex flex-col space-y-2">
                <FIO worker={worker} selectedWorker={selectedWorker} />
                <INN worker={worker} selectedWorker={selectedWorker} />

                <div className="grow"></div>
                <Select items={employeesArray} onChange={handleSelectWorker} current={selectedWorker} />
            </div>

            {worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum && <SubmitCashier pending={pending} />}
        </form>
    )
})

Cashier.displayName = "Cashier"

interface INNProps {
    worker: IWorker
    selectedWorker: IWorker
}
const INN = memo(({ worker, selectedWorker }: INNProps) => {
    return (
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
    )
})
INN.displayName = "INN"

interface FIOProps extends INNProps {}
const FIO = memo(({ selectedWorker, worker }: FIOProps) => {
    return (
        <div className="grid grid-cols-7 items-center justify-center text-sm">
            <span className="col-span-3">ФИО: {worker.OfficialName}</span>

            {worker.genTaxPayerIdNum !== selectedWorker.genTaxPayerIdNum && (
                <>
                    <span className="col-span-1 text-base text-yellow-300">&rarr;</span>
                    <span className="col-span-3 text-right italic text-yellow-300">{selectedWorker.OfficialName}</span>
                </>
            )}
        </div>
    )
})
FIO.displayName = "FIO"
