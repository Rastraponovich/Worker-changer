import { CommandResult } from "@/interfaces/rk7Api"
import { IWorker, IWorkerChangeRespose } from "@/interfaces/types"
import { AxiosResponse } from "axios"
import {
    attach,
    createEffect,
    createEvent,
    createStore,
    forward,
    sample,
} from "effector"
import { iternalAPI } from "lib/api"
import { ChangeEvent } from "react"

const defaultWoker: IWorker = {
    genTaxPayerIdNum: null,
    Code: null,
    Ident: null,
    Name: "",
    OfficialName: "",
    Status: "",
    GUIDString: "",
} as IWorker

type APIResponse = {
    workers: IWorker[]
    commandResult: CommandResult
    status: any
    error: boolean
    isAxiosError: boolean
}

const API = async () => await iternalAPI.get("/workers")

const getWorkerAPI = async (guid: string) =>
    await iternalAPI.get(`/workers/${guid}`)

const SaveWorkerAPI = async (worker: IWorker) =>
    await iternalAPI.post("/setworker", { worker })

//--------------------------//

const getWorkerFx = createEffect<
    string,
    AxiosResponse<{ worker: IWorker }>,
    Error
>(getWorkerAPI)
const saveWorkerFx = createEffect<
    IWorker,
    AxiosResponse<IWorkerChangeRespose>,
    Error
>(SaveWorkerAPI)

const getWorkersFx = createEffect<never, AxiosResponse<APIResponse>, Error>(API)

const $loadingWorkers = createStore<boolean>(false).on(
    getWorkersFx.pending,
    (_, payload) => payload
)

const $workers = createStore<IWorker[]>([]).reset(getWorkersFx.pending)
const getWorkers = createEvent()

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
    fn: (workers) =>
        workers.filter(
            (item) => item.Name !== "Кассир ИП" && item.Name !== "Кассир ООО"
        ),
    target: $employeesArray,
})

//IPWorker
const $currentIPWorker = createStore<IWorker>(defaultWoker)
const selectNewIPWorker = createEvent<ChangeEvent<HTMLSelectElement>>()

sample({
    clock: $workers,
    fn: (workers) => workers.find((worker) => worker.Name === "Кассир ИП"),
    target: $currentIPWorker,
})

const $newIPWorker = createStore<IWorker>({} as IWorker).on(
    $currentIPWorker,
    (_, worker) => worker
)

sample({
    clock: selectNewIPWorker,
    source: $employeesArray,
    fn: (arr, e) => arr.find((worker) => worker.GUIDString === e.target.value),
    target: $newIPWorker,
})

const saveIPWorker = createEvent()

const saveIPWorkerFx = attach({
    effect: saveWorkerFx,
    source: [$currentIPWorker, $newIPWorker],
    mapParams: (_, [current, selected]) => {
        return {
            ...selected,
            GUIDString: current.GUIDString,
        }
    },
})

sample({
    clock: saveIPWorker,
    target: saveIPWorkerFx,
})

const refreshIPWorker = createEvent()

sample({
    clock: saveIPWorkerFx.doneData,
    target: refreshIPWorker,
})

const getIPWorkerFx = attach({
    effect: getWorkerFx,
    source: $currentIPWorker,
    mapParams: (_, { GUIDString }) => GUIDString,
})

sample({
    clock: refreshIPWorker,
    target: getIPWorkerFx,
})

sample({
    clock: getIPWorkerFx.doneData,
    fn: (res) => res.data.worker,
    target: $currentIPWorker,
})

//OOO//
const saveOOOWorker = createEvent()
const refreshOOOWorker = createEvent()
const selectNewOOOWorker = createEvent<ChangeEvent<HTMLSelectElement>>()

const $currentOOOWorker = createStore<IWorker>(defaultWoker)

sample({
    clock: $workers,
    fn: (workers) => workers.find((worker) => worker.Name === "Кассир ООО"),
    target: $currentOOOWorker,
})

const $newOOOWorker = createStore<IWorker>({} as IWorker).on(
    $currentOOOWorker,
    (_, worker) => worker
)

sample({
    clock: selectNewOOOWorker,
    source: $employeesArray,
    fn: (arr, e) => arr.find((worker) => worker.GUIDString === e.target.value),
    target: $newOOOWorker,
})

const saveOOOWorkerFx = attach({
    effect: saveWorkerFx,
    source: [$currentOOOWorker, $newOOOWorker],
    mapParams: (_, [current, selected]) => {
        return {
            ...selected,
            GUIDString: current.GUIDString,
        }
    },
})

sample({
    clock: saveOOOWorker,
    target: saveOOOWorkerFx,
})

sample({
    clock: saveOOOWorkerFx.doneData,
    target: refreshOOOWorker,
})

const getOOOWorkerFx = attach({
    effect: getWorkerFx,
    source: $currentOOOWorker,
    mapParams: (_, { GUIDString }) => GUIDString,
})

sample({
    clock: refreshOOOWorker,
    target: getOOOWorkerFx,
})

sample({
    clock: getOOOWorkerFx.doneData,
    fn: (res) => res.data.worker,
    target: $currentOOOWorker,
})

export {
    getWorkers,
    $workers,
    $loadingWorkers,
    $currentIPWorker,
    $currentOOOWorker,
    $employeesArray,
    $newOOOWorker,
    $newIPWorker,
    selectNewOOOWorker,
    selectNewIPWorker,
    saveOOOWorker,
    saveIPWorker,
    refreshIPWorker,
}
