import { CommandResult } from "@/interfaces/rk7Api"
import { IWorker, IWorkerChangeRespose } from "@/interfaces/types"
import { AxiosResponse } from "axios"
import { createEffect } from "effector"
import { API } from "features/api"

type APIResponse = {
    workers: IWorker[]
    commandResult: CommandResult
    status: any
    error: boolean
    isAxiosError: boolean
}

const getWorkerFx = createEffect<string, AxiosResponse<{ worker: IWorker }>, Error>(API.getWorkerAPI)
const saveWorkerFx = createEffect<IWorker, AxiosResponse<IWorkerChangeRespose>, Error>(API.SaveWorkerAPI)
const getWorkersFx = createEffect<never, AxiosResponse<APIResponse>, Error>(API.getWorkersAPI)

export { getWorkerFx, saveWorkerFx, getWorkersFx }
