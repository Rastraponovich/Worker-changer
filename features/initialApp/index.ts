import { AxiosResponse } from "axios"
import {
    createEffect,
    createEvent,
    createStore,
    forward,
    sample,
    scopeBind,
} from "effector"
import { iternalAPI } from "lib/api"

import { RK7QueryResult } from "@/interfaces/rk7Api"

const API = async () => await iternalAPI.get("/status")

const getStatusFx = createEffect<never, AxiosResponse<RK7QueryResult>, Error>(
    API
)

const getStatus = createEvent()

const $status = createStore<RK7QueryResult>(null)

const $version = createStore("2.0.0")

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

export { getStatus, $status, $initalState, $version, $time, startTime }
