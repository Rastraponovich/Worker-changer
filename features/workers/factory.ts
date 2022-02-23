import { IWorker, IWorkerChangeRespose } from "@/interfaces/types"
import { AxiosResponse } from "axios"
import {
    attach,
    createEffect,
    createEvent,
    createStore,
    Effect,
    Event,
    forward,
    restore,
    sample,
    Store,
} from "effector"
import { API } from "features/api"
import { ChangeEvent } from "react"
import { FactoryProps, FactoryReturn } from "./types"

const defaultWoker: IWorker = {
    genTaxPayerIdNum: null,
    Code: null,
    Ident: null,
    Name: "",
    OfficialName: "",
    Status: "",
    GUIDString: "",
} as IWorker

const createWorkerFactory = (props: FactoryProps): FactoryReturn => {
    const saveWorkerFx = createEffect<IWorker, AxiosResponse<IWorkerChangeRespose>, Error>(API.SaveWorkerAPI)
    const getWorkerFx = createEffect<string, AxiosResponse<{ worker: IWorker }>, Error>(API.getWorkerAPI)

    const { $employeesArray, name } = props
    const saveWorker = createEvent()
    const refreshWorker = createEvent()
    const selectWorker = createEvent<ChangeEvent<HTMLSelectElement>>()

    const $currentWorker = createStore<IWorker>(defaultWoker, { sid: name }).on(
        getWorkerFx.doneData,
        (_, res) => res.data.worker
    )

    const $newWorker = createStore<IWorker>(defaultWoker, { sid: `new${name}` })

    forward({ from: $currentWorker, to: $newWorker })

    sample({
        clock: selectWorker,
        source: $employeesArray,
        fn: (arr, e) => arr.find((worker) => worker.GUIDString === e.target.value),
        target: $newWorker,
    })

    sample({
        clock: saveWorker,
        source: [$currentWorker, $newWorker],
        fn: ([current, created], _) => {
            return {
                ...created,
                GUIDString: current.GUIDString,
            }
        },
        target: saveWorkerFx,
    })

    sample({
        clock: saveWorkerFx.doneData,
        target: refreshWorker,
    })

    sample({
        clock: refreshWorker,
        source: $currentWorker,
        fn: ({ GUIDString }, _) => GUIDString,
        target: getWorkerFx,
    })

    const $saveWorkerPending = createStore<boolean>(false).on(saveWorkerFx.pending, (_, state) => state)

    const $getWorkerPending = createStore<boolean>(false).on(getWorkerFx.pending, (_, state) => state)

    return {
        saveWorker,
        refreshWorker,
        selectWorker,
        $currentWorker,
        $getWorkerPending,
        $newWorker,
        $saveWorkerPending,
    }
}

export { createWorkerFactory }
