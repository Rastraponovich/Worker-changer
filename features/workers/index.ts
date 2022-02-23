import { IWorker } from "@/interfaces/types"
import { createEvent, createStore, forward, sample, scopeBind } from "effector"
import { getWorkersFx } from "./api"
import { createWorkerFactory } from "./factory"
import { WorkerProps } from "./types"

//--------------------------//

const $loadingWorkers = createStore<boolean>(false).on(getWorkersFx.pending, (_, payload) => payload)

const $workers = createStore<IWorker[]>([], { sid: "workers" }).reset(getWorkersFx.pending)
const getWorkers = createEvent()

const $getWorkersStatus = createStore<boolean>(false)
    .on(getWorkersFx.doneData, () => true)
    .reset(getWorkers)

const $errorGetWorker = createStore<boolean>(false)
    .on(getWorkersFx.fail, () => true)
    .reset(getWorkers)

sample({
    clock: getWorkersFx.doneData,
    fn: (res) => res.data.workers,
    target: $workers,
})

forward({
    from: getWorkers,
    to: getWorkersFx,
})

const $employeesArray = createStore<IWorker[]>([]).reset(getWorkersFx.pending)

sample({
    clock: $workers,
    fn: (workers) => workers.filter((item) => item.Name !== "Кассир ИП" && item.Name !== "Кассир ООО"),
    target: $employeesArray,
})

const createdIPWorker = createWorkerFactory({ $employeesArray, name: "Кассир ИП" })

createdIPWorker.$currentWorker.on($workers, (_, workers) => workers.find((worker) => worker.Name === "Кассир ИП"))

const createdOOOWorker = createWorkerFactory({ $employeesArray, name: "Кассир ООО" })
createdOOOWorker.$currentWorker.on($workers, (_, workers) => workers.find((worker) => worker.Name === "Кассир ООО"))

const oooWorker: WorkerProps = {
    $currentWorker: createdOOOWorker.$currentWorker,
    $newWorker: createdOOOWorker.$newWorker,
    selectWorker: createdOOOWorker.selectWorker,
    saveWorker: createdOOOWorker.saveWorker,
    refreshWorker: createdOOOWorker.refreshWorker,
    $getWorkerPending: createdOOOWorker.$getWorkerPending,
    $saveWorkerPending: createdOOOWorker.$saveWorkerPending,
}

const ipWorker: WorkerProps = {
    $currentWorker: createdIPWorker.$currentWorker,
    $newWorker: createdIPWorker.$newWorker,
    selectWorker: createdIPWorker.selectWorker,
    saveWorker: createdIPWorker.saveWorker,
    refreshWorker: createdIPWorker.refreshWorker,
    $getWorkerPending: createdIPWorker.$getWorkerPending,
    $saveWorkerPending: createdIPWorker.$saveWorkerPending,
}

export {
    oooWorker,
    ipWorker,
    getWorkers,
    $workers,
    $loadingWorkers,
    $employeesArray,
    $getWorkersStatus,
    $errorGetWorker,
}
