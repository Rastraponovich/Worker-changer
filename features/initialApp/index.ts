import type { AxiosResponse } from "axios"
import { createEvent, createEffect, createStore, forward, sample, scopeBind } from "effector"
import config from "package.json"

import type { RK7QueryResult } from "src/shared/lib/models"
import { API } from "features/api"

const startApp = createEvent()

// sample({
//     clock: startApp,
//     target: getWorkers,
// })

const getStatusFx = createEffect<never, AxiosResponse<RK7QueryResult>, Error>(API.getStatusAPI)

const getStatus = createEvent()

const $status = createStore<RK7QueryResult>(null)

const $version = createStore(config.version)

const $initalState = createStore<boolean>(false).reset(getStatusFx.pending)

forward({
    from: getStatus,
    to: getStatusFx,
})

sample({
    clock: getStatusFx.doneData,

    fn: (response) => response.data,
    target: $status,
})

sample({
    clock: getStatusFx.doneData,
    fn: (response) => response.data.Status === "Ok" && true,
    target: $initalState,
})

const $time = createStore<string>("")

const updateTime = createEvent<string>()
const startTime = createEvent()
const startTimeFx = createEffect(() => {
    const callUpdateTime = scopeBind(updateTime)

    return setInterval(() => {
        callUpdateTime(new Date().toLocaleString())
    }, 1000)
})

forward({
    from: startTime,
    to: startTimeFx,
})

sample({
    clock: updateTime,
    fn: (time) => time,
    target: $time,
})

forward({
    from: startApp,
    to: getStatus,
})

export { startApp, getStatus, $status, $initalState, $version, $time, startTime }
